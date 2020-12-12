import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import produce from "immer";
import { getObjectivesCount } from 'client/ObjectivesClient'
import { _getRangeDateCurrentQuarter } from 'components/shared/card/OverallProgressCard/_overallProgressCardHelper'
import { useUser } from "context/UserContext";
import MinMaxValidationModal from 'components/shared/modal/MinMaxValidationModal'
import moment from "moment";
import { getConfig } from "client/admin/Config";

function useValidationMinMax(weightValue) {
  const initialValues = {
    showModalValidationCreateGoal: '',
    showModalValidationChangeGoalAlignment: '',
    showModalValidationDeleteGoal: '',
    totalObjectives: '',
    isShowWarning: false,
    warningMessage: '',
  }

  const [state, setState] = useState(initialValues)
  const immerSetState = newState => setState(currentState => produce(currentState, newState));
  const { user, config } = useUser();
  const query = new URLSearchParams(useLocation().search)

  const getParams = {
    assigneeId: user.id,
    parentNotAssignedTo: user.id,
    periodBegin: moment(`${new Date().getFullYear()}-01-01`).toISOString(),
    periodEndBefore: moment(`${new Date().getFullYear()}-12-31`).endOf("day").toISOString(),
    state: ['running', 'completed', 'reviewed', 'draft', 'edited'],
    type: ['goal', 'annual_goal']
  }

  const _setParamsIfobjectifConfigQuarterly = (maxPeriodObjectives) => {
    return _getRangeDateCurrentQuarter()
  }

  const _handleGetConfigAdminObjectives = async () => {
    const { data } = await getConfig();
    return data.objectivesConfig
  }

  const _handleGetCountObjectives = async (isSetWeight, maxPeriodObjectives) => {
    let params
    if (isSetWeight || maxPeriodObjectives !== "quarterly") {
      params = getParams
    } else {
      const quarterlyParam = _setParamsIfobjectifConfigQuarterly(maxPeriodObjectives)
      params = {
        ...getParams, quarterlyParam
      }
    }
    const { data } = await getObjectivesCount(params)
    return data
  }

  const getDataMinMax = async (isSetWeight = false) => {
    const {
      maxObjectivesOn,
      minObjectivesOn,
      maxNumberOfObjectives,
      minNumberOfObjectives,
      maxPeriodObjectives,
      maxObjectiveWeight,
      minObjectiveWeight,
      maxObjectiveWeightOn,
      minObjectiveWeightOn,
      maxSumOfObjectivesWeightPercentage,
      maxSumOfObjectivesWeightPercentageOn,
      maxSumOfObjectivesWeightType,
      maxSumOfObjectivesWeightTypeOn
    } = config.objectivesConfig

    const { totalObjectives, totalWeights, overallProgress, progressColorHex, listStatus } = await _handleGetCountObjectives(isSetWeight, maxPeriodObjectives) || {};

    return {
      minNumberOfObjectives,
      maxNumberOfObjectives,
      minObjectivesOn,
      maxObjectivesOn,
      totalObjectives,
      totalWeights,
      maxObjectiveWeight,
      minObjectiveWeight,
      maxObjectiveWeightOn,
      minObjectiveWeightOn,
      maxSumOfObjectivesWeightPercentage,
      maxSumOfObjectivesWeightPercentageOn,
      maxSumOfObjectivesWeightType,
      maxSumOfObjectivesWeightTypeOn,
      overallProgress,
      progressColorHex,
      listStatus
    }
  }

  const getDataCoaching = async ({ paramsCoaching }) => {
    const {
      maxObjectivesOn,
      minObjectivesOn,
      maxNumberOfObjectives,
      minNumberOfObjectives,
      maxPeriodObjectives,
      maxObjectiveWeight,
      minObjectiveWeight,
      maxObjectiveWeightOn,
      minObjectiveWeightOn,
      maxSumOfObjectivesWeightPercentage,
      maxSumOfObjectivesWeightPercentageOn,
      maxSumOfObjectivesWeightType,
      maxSumOfObjectivesWeightTypeOn
    } = config.objectivesConfig

    const { data: { totalObjectives, totalWeights, overallProgress, progressColorHex, listStatus } } = await getObjectivesCount(paramsCoaching)

    return {
      minNumberOfObjectives,
      maxNumberOfObjectives,
      minObjectivesOn,
      maxObjectivesOn,
      totalObjectives,
      totalWeights,
      maxObjectiveWeight,
      minObjectiveWeight,
      maxObjectiveWeightOn,
      minObjectiveWeightOn,
      maxSumOfObjectivesWeightPercentage,
      maxSumOfObjectivesWeightPercentageOn,
      maxSumOfObjectivesWeightType,
      maxSumOfObjectivesWeightTypeOn,
      overallProgress,
      progressColorHex,
      listStatus
    }
  }

  const checkValidationCreateGoal = async ({ nextUrl }) => {
    let res = { isSettingMaxnObjectivesOn: false }

    const { maxObjectivesOn, maxNumberOfObjectives, totalObjectives } = await getDataMinMax()

    if (maxObjectivesOn && (totalObjectives >= maxNumberOfObjectives)) {
      const props = {
        type: "ValidationAddNewGoal",
        _handleActionModal: () => _handleActionCloseModal({ typeModal: 'showModalValidationCreateGoal' }),
        _handleNext: () => {
          nextUrl()
          _handleActionCloseModal({ typeModal: 'showModalValidationCreateGoal' })
        },
        totalObjectives,
        datacy:"modal-primary-action"
      }
      immerSetState(draft => {
        draft['showModalValidationCreateGoal'] = <MinMaxValidationModal  {...props} />
      })
      res.isSettingMaxnObjectivesOn = true
    }
    return res

  }

  const checkValidationDeleteGoal = async () => {
    let res = { isSettingMinObjectivesOn: false }
    const { minObjectivesOn, totalObjectives } = await getDataMinMax()
    if (minObjectivesOn) {
      immerSetState(draft => {
        draft['showModalValidationDeleteGoal'] = true
        draft['totalObjectives'] = totalObjectives
      })
      res.isSettingMinObjectivesOn = true
    }
    return res
  }

  const checkValidationChangeGoalAlignment = async ({ nextAction }) => {
    let res = { isSettingMinObjectivesOn: false }

    const { minObjectivesOn, totalObjectives } = await getDataMinMax()
    if (minObjectivesOn) {
      const props = {
        type: "ValidationChangeGoalAlignment",
        _handleActionModal: () => _handleActionCloseModal({ typeModal: 'showModalValidationChangeGoalAlignment' }),
        _handleNext: () => {
          nextAction()
          _handleActionCloseModal({ typeModal: 'showModalValidationChangeGoalAlignment' })
        },
        totalObjectives
      }
      immerSetState(draft => {
        draft['showModalValidationChangeGoalAlignment'] = <MinMaxValidationModal {...props} />
      })
      res.isSettingMinObjectivesOn = true
    }
    return res
  }

  const _handleActionCloseModal = ({ typeModal }) => {
    immerSetState(draft => {
      draft[typeModal] = ""
    })
  }

  const checkValidationSoftWarning = async () => {
    const { maxObjectiveWeightOn, minObjectiveWeightOn, maxObjectiveWeight, minObjectiveWeight } = config.objectivesConfig
    const { objectiveWeightType } = config;
    if (objectiveWeightType === "percentage") {
      if (maxObjectiveWeightOn && minObjectiveWeightOn && (weightValue > maxObjectiveWeight || weightValue < minObjectiveWeight)) {
        immerSetState(draft => {
          draft.isShowWarning = true
          draft.warningMessage = `Min. weight for each objectives ${minObjectiveWeight}% and max. ${maxObjectiveWeight}% (top parent only)`
        })
      } else if (maxObjectiveWeightOn && !minObjectiveWeightOn && weightValue > maxObjectiveWeight) {
        immerSetState(draft => {
          draft.isShowWarning = true
          draft.warningMessage = `Max. weight for each objectives ${maxObjectiveWeight}% (top parent only)`
        })
      } else if (!maxObjectiveWeightOn && minObjectiveWeightOn && weightValue < minObjectiveWeight) {
        immerSetState(draft => {
          draft.isShowWarning = true
          draft.warningMessage = `Min. weight for each objectives ${minObjectiveWeight}% (top parent only)`
        })
      } else {
        immerSetState(draft => {
          draft.isShowWarning = false
          draft.warningMessage = ""
        })
      }
    }
  }

  return {
    showModalValidationCreateGoal: state.showModalValidationCreateGoal,
    showModalValidationChangeGoalAlignment: state.showModalValidationChangeGoalAlignment,
    showModalValidationDeleteGoal: state.showModalValidationDeleteGoal,
    checkValidationCreateGoal,
    checkValidationDeleteGoal,
    checkValidationChangeGoalAlignment,
    _handleActionCloseModal,
    getDataMinMax,
    immerSetState,
    totalObjectives: state.totalObjectives,
    checkValidationSoftWarning,
    isShowWarning: state.isShowWarning,
    warningMessage: state.warningMessage,
    _handleGetCountObjectives,
    _handleGetConfigAdminObjectives,
    getDataCoaching
  }
}

export default useValidationMinMax
