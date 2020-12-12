import { useState } from "react";
import produce from "immer";

function useFormHelper() {
  const initialValues = {}
  const [state, setState] = useState(initialValues)
  const immerSetState = newState => setState(currentState => produce(currentState, newState));

  const _handleOnChangeInput = e => {
    const { name, value } = e.target
    immerSetState(draft => {
      draft[name] = value
    })
  }

  const _handleOnChangeToogleSwitch = e => {
    const { id } = e.target
    immerSetState(draft => {
      draft[id] = !state[id]
    })
  }

  const _handleOnChangeSelect = (value, name) => {
    immerSetState(draft => {
      draft[name] = value
    })
  }

  const _handleOnClickCircleComponent = (e, isChecked) => {
    const { id } = e.target.parentElement
    immerSetState(draft => {
      draft[id] = !isChecked
    })
  }

  const _handleOnChangeInputAutoSave = e => {
    const { name, value } = e.target
    immerSetState(draft => {
      draft[name] = value
      draft['autoSave'] = true
    })
  }

  const _handleOnChangeToogleSwitchAutoSave = e => {
    const { id } = e.target
    immerSetState(draft => {
      draft[id] = !state[id]
      draft['autoSave'] = true
    })
  }

  const _handleOnChangeSelectAutoSave = (value, name) => {
    immerSetState(draft => {
      draft[name] = value
      draft['autoSave'] = true
    })
  }

  const _handleOnClickCircleComponentAutoSave = (e, isChecked) => {
    const { id } = e.target.parentElement
    immerSetState(draft => {
      draft[id] = !isChecked
      draft['autoSaveCircle'] = true
    })
  }

  return {
    state,
    immerSetState,
    _handleOnChangeToogleSwitch,
    _handleOnChangeInput,
    _handleOnChangeSelect,
    _handleOnClickCircleComponent,
    _handleOnChangeInputAutoSave,
    _handleOnChangeToogleSwitchAutoSave,
    _handleOnChangeSelectAutoSave,
    _handleOnClickCircleComponentAutoSave,
  }
}

export default useFormHelper
