var Avatar = require("avatar-initials");

var Config = require("src/library/utils/Config");
var moment = require("main/hooks/node_modules/moment");
var AmplitudeUtils = require('src/library/utils/AmplitudeUtils')
var env = require('./env').default;
var get = require("lodash/get");

var formattedNumber = function (number) {
  return new Intl.NumberFormat("id-ID").format(number);
};

var parseNewlinetoBr = function (text) {
  if (typeof text === "string" && text) {
    text = text.replace(/(?:\r\n|\r|\n)/g, "<br/>");
  }
  return text;
};

var parseUrlinString = function (text) {
  if (typeof text === "string" && text) {
    var urlExpression = /&#x2F;/gi;
    text = text.replace(urlExpression, "/");

    var expression = /([-a-zA-Z0-9@:%_\+~#?&//=]([.][-a-zA-Z0-9@:%_\+~#?&//=])*){1,256}\.[a-z]{2,4}\b(\/([-a-zA-Z0-9]+[@:%_\+.~#?&//=]?)*)?/gi;
    var regex = new RegExp(expression);

    var matched = text.match(regex);
    if (matched) {
      var convertUrl = function (match, offset, string) {
        var pattern = /^((http|https):\/\/)/;
        var url = match.toLowerCase();
        if (!url.match(pattern)) url = "http://" + url;

        return '<a href="' + url + '" target="_blank">' + match + "</a>";
      };

      text = text.replace(regex, convertUrl);
    }
  }

  return text;
};

var taggedUserTemplate = function (userObj) {
  var text = "";
  if (typeof userObj === "object") {
    var userNumber = Object.keys(userObj).length;
    if (userNumber !== 0) {
      text = " &#8212; With";
      var showUserLimit = 3;
      if (userNumber === 4) showUserLimit = 2;

      for (var i = 0; i < userNumber; i++) {
        if (i < showUserLimit) {
          text += i === 0 ? " " : ", ";
          text += "<b>" + userObj[i].fullName + "</b>";
        }
      }

      if (userNumber > 3) {
        var diff = parseInt(userNumber) - showUserLimit;
        text += ", and <b>" + diff + " others</b>";
      }
    }
  }

  return text;
};

var imageIsValid = function (image) {
  var isValid = false;
  if (
    image !== "#" &&
    image !== null &&
    image !== "" &&
    typeof image === "string"
  )
    isValid = true;

  return isValid;
};

var parseHttptoHttps = function (text) {
  if (typeof text === "string" && text !== null && text !== "") {
    text = text.replace("http://", "https://");
  }

  return text;
};

var replaceMatched = function (text, expression, className) {
  var regex = new RegExp(expression);
  var matched = text.match(regex);
  if (matched) {
    var convertMention = function (match, offset, string) {
      return `<span class="${className}">` + match + '</span>';
    }

    return text.replace(regex, convertMention);
  }
  return text
}

var parseHashtaginString = function (text) {
  if (typeof text === "string" && text) {
    var expression = /[\t\n ]#([A-Za-z0-9]+)|^#([A-Za-z0-9]+)/gi;
    text = replaceMatched(text, expression, "caption-hashtag");
  }

  return text;
};

var parseMentioninString = function (text, metaMentions) {
  if (typeof text === "string" && text && metaMentions) {
    var user = [];

    for (var i = 0; i < metaMentions.length; i++) {
      user.push(text.substr(metaMentions[i].startIndex, metaMentions[i].length));
    }

    for (var j = 0; j < user.length; j++) {
      var expression = user[j];
      text = replaceMatched(text, expression, "caption-mention");
    }

    return text;
  }
};

var parseCaption = function (text, metaMentions) {
  if (metaMentions) {
    text = parseMentioninString(text, metaMentions);
  }
  text = parseHashtaginString(text);
  text = parseUrlinString(text);
  text = parseNewlinetoBr(text);

  return text;
};

var htmlToText = function (text) {
  var expression = /&nbsp;/gi;
  var regex = new RegExp(expression);
  var match = text.match(regex);
  if (match) {
    text = text.replace(regex, " ");
  }

  var expression = /<br>$/gi;
  var regex = new RegExp(expression);
  var match = text.match(regex);
  if (match) {
    text = text.replace(regex, "");
  }

  var expression = /<br\s*[\/]?>/gi;
  var regex = new RegExp(expression);
  var match = text.match(regex);
  if (match) {
    text = text.replace(regex, "\n");
  }

  return text;
};

var translateMarkdown = function (text) {
  text = text?.replace(/\*([^*]+)\**/g, '<b>$1</b>')
  text = text?.replace(/\*/g, '')
  return text
}

var getLocalTeamName = function () {
  return localStorage.performanceTeamName;
};

var setLocalTeamName = function (teamName) {
  localStorage.performanceTeamName = teamName;
};

var getLocalToken = function () {
  return localStorage.performanceToken;
};

var getDeviceId = function () {
  return localStorage.deviceId;
};

var getProvisionToken = function () {
  return localStorage.provisionToken;
};

var getUserToken = function () {
  return localStorage.userToken;
};


var getLocalAppName = function () {
  return localStorage.performanceAppName;
};

var setLocalAppName = function (appName) {
  localStorage.performanceAppName = appName;
};

var getLocalUserInfo = function () {
  // // if(ls.hasOwnProperty('ls') === false) {
  // if(ls.ls.get('performanceUserInfo') === "") {
  // 	redirectToOrganizationPage();
  // 	return "{}";
  // } else {
  // 	var performanceUserInfo = ls.get('performanceUserInfo');
  // 	return performanceUserInfo;
  // }
  return localStorage.getItem("performanceUserInfo");
};

var setLocalUserInfo = function (userInfo) {
  localStorage.setItem("performanceUserInfo", userInfo);
};

var getLocalTeamLogo = function () {
  return localStorage.performanceTeamLogo;
};

var setLocalTeamLogo = function (teamLogo) {
  localStorage.performanceTeamLogo = teamLogo;
};

var setAppStatus = function () {
  localStorage.appStatus = "internal";
};

var getAppStatus = function () {
  return localStorage.appStatus;
};

var setObjectiveLocale = function (locale) {
  localStorage.setItem("objectiveLocale", JSON.stringify(locale));
};

var getLocale = function (searchKey, lowercase, locales) {
  if (localStorage.getItem(locales) && localStorage.getItem(locales) !== null && localStorage.getItem(locales) !== undefined) {
    let ls;
    try {
      ls = JSON.parse(localStorage.getItem(locales));
    } catch (e) {
    }

    if (ls && searchKey) {
      let res = ls[searchKey?.toLowerCase()];

      if (res === undefined) {
        res = searchKey;
      }

      return lowercase ? res.toLowerCase() : res;
    }
  }
  return searchKey;
}

var getObjectiveLocale = function (searchKey, lowercase = false, locales = "objectiveLocales") {
  return getLocale(searchKey, lowercase, locales)
};

var getCultureLocale = function (searchKey, lowercase = false, locales = "cultureLocales") {
  return getLocale(searchKey, lowercase, locales)
};

var removeAllLocalStorage = function () {
  var key = [
    "performanceTeamName",
    "performanceToken",
    "performanceUserInfo",
    "performanceAppName",
    "performanceTeamLogo",
    "appStatus",
    "objectiveLocale"
  ];

  for (var i in key) {
    localStorage.removeItem(key[i]);
  }
};

var findIndexofArray = function (data, str) {
  var index = -1;

  if (Array.prototype.indexOf) {
    index = data.indexOf(str);
  } else {
    for (var i in data) {
      if (data[i] === str) {
        index = i;
        break;
      }
    }
  }

  return index;
};

var abortXHR = function (xhr) {
  if (xhr && xhr.readyState != 4) {
    xhr.abort();
  }
};

var clampNumber = function (num, a, b) { return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b)) }

var metricConvertion = function (metricObject) {
  var currentValue = metricObject.currentValue || metricObject.current_value;
  var targetValue = metricObject.targetValue || metricObject.target_value;
  var metricUnit = metricObject.unit;
  var metricBarColor = "#73cc72";

  var metricValuePercentage = (parseFloat(currentValue) / parseFloat(targetValue)) * 100;
  if (metricValuePercentage < 33.4) {
    metricBarColor = "#f96565";
  } else if (metricValuePercentage >= 33.4 && metricValuePercentage < 66.7) {
    metricBarColor = "#ffd15a";
  }

  metricValuePercentage = clampNumber(metricValuePercentage, 0, 100)

  var response = {
    currentValue: currentValue,
    targetValue: targetValue,
    percentage: metricValuePercentage,
    color: metricBarColor,
    unit: metricUnit
  };

  return response;
};

var isPasswordValid = function (password, confirmPassword) {
  var isPasswordValid = true;
  var invalidType = "pattern";
  if (password === "" || confirmPassword === "") {
    isPasswordValid = false;
  } else if (password !== confirmPassword) {
    isPasswordValid = false;
    invalidType = "match";
  } else if (password.length < 8 || password.length > 30) {
    isPasswordValid = false;
  } else {
    var numberRegex = new RegExp("[0-9]");
    var capitalRegex = new RegExp("[A-Z]");

    if (
      numberRegex.test(password) === false ||
      capitalRegex.test(password) === false
    ) {
      isPasswordValid = false;
    }
  }

  var response = {
    isValid: isPasswordValid,
    type: invalidType
  };

  return response;
};

var lockScroll = function (isLock) {
  if (isLock) {
    if (document.body.className !== "scroll-locked") {
      document.body.className = "scroll-locked";
    }
  } else {
    document.body.removeAttribute("class");
  }
};

var redirectToOrganizationPage = function (history) {
  var path = Config.path.organizationLogin;

  var appName = getLocalAppName();
  if (typeof appName !== "undefined" && appName !== Config.appName) {
    var teamName = getLocalTeamName();
    path += "?team_name=" + teamName;
  }

  removeAllLocalStorage();
  unregisterServiceWorker();
  if (typeof history !== "undefined") {
    history.replace(path);
  }
};

var unregisterServiceWorker = function () {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    if (!registrations.length) {
      return;
    }
    for (let registration of registrations) {
      registration.unregister();
    }
  });
};

var redirectTo404 = function (router) {
  var path = Config.path.pageNotFound;
  if (typeof router !== "undefined") {
    router.replace(path);
  }
};

var parseReadableFileSize = function (size) {
  var newSize = size;
  var threshold = 1024;
  var unit = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var unitCounter = 0;

  while (
    unitCounter < unit.length - 1 &&
    Math.round(Math.abs(newSize / threshold)) > 0
  ) {
    newSize = newSize / threshold;
    unitCounter++;
  }

  newSize = newSize.toFixed(1) + " " + unit[unitCounter];
  return newSize;
};

var dateObjectRestructure = function (date, format) {
  var newDateObject = undefined;

  if (typeof date === "undefined") {
    newDateObject = moment();
  } else {
    newDateObject = moment(date);
  }

  if (typeof format === "undefined") {
    format = "MMM, DD YYYY";
  }

  var displayFormat = newDateObject.format(format);
  var isoFormat = newDateObject.toISOString();

  var dateObject = {
    displayFormat: displayFormat,
    isoFormat: isoFormat
  };

  return dateObject;
};

var loadMoreValidator = function (target, threshold, callback) {
  threshold = parseInt(threshold);
  if (
    target.scrollTop + target.clientHeight >=
    target.scrollHeight - threshold
  ) {
    callback();
  }
};

var pasteRichTextHandler = function (e) {
  e.stopPropagation();
  e.preventDefault();

  var clipboardData =
    (e.originalEvent || e).clipboardData || window.clipboardData;
  var pastedData = clipboardData.getData("text/plain");
  pastedData = parseNewlinetoBr(pastedData);
  var expression = /<br\s*[\/]?>/gi;
  var regex = new RegExp(expression);
  var match = pastedData.match(regex);
  if (match) {
    pastedData = pastedData.replace(regex, "");
  }

  document.execCommand("insertText", false, pastedData);
};

var amplitudeAnalytic = function (event, properties = null) {
  var amplitudeInfo = JSON.parse(localStorage.amplitudeInfo);

  //set user prop
  var userProperties = {
    email: amplitudeInfo.email
  };

  if (properties == null) {
    var eventProperties = {
      source: "direct"
    };
  } else {
    var eventProperties = properties;
  }
};

var countObjectives = function (objectives, n = 1) {
  // n start at 1
  // because we count the parent at start

  // sub goal 3 or last children doesn't have children object
  if (
    typeof objectives.children === "undefined" ||
    objectives.children.length === 0
  ) {
    return n;
  }

  objectives.children.map(objectives => {
    n = countObjectives(objectives, ++n);
  });

  return n;
};

var getMaxLevelObjectives = function (objectives, max_level = 1) {
  if (
    typeof objectives.children === "undefined" ||
    objectives.children.length === 0
  ) {
    return max_level;
  } else {
    if (max_level < 4) {
      max_level++;
      objectives.children.map(objectives => {
        max_level = getMaxLevelObjectives(objectives, max_level);
      });
    }
  }

  return max_level;
};

var countDescendantsWithDifferentMetrics = function (
  objectives,
  parent_metrics_id = -1,
  n_diff = 0
) {
  if (parent_metrics_id === -1) {
    // no unit metrics
    if (typeof objectives.measurement.unit_id === "undefined") {
      parent_metrics_id = 0;
    } else {
      parent_metrics_id = objectives.measurement.unit_id;
    }
  } else {
    if (typeof objectives.measurement.unit_id === "undefined") {
      var current_metrics_id = 0;
    } else {
      var current_metrics_id = objectives.measurement.unit_id;
    }

    if (parent_metrics_id !== current_metrics_id) {
      ++n_diff;
    }
  }

  if (
    typeof objectives.children === "undefined" ||
    objectives.children.length === 0
  ) {
    return n_diff;
  } else {
    objectives.children.map(objectives => {
      n_diff = countDescendantsWithDifferentMetrics(
        objectives,
        parent_metrics_id,
        n_diff
      );
    });
  }

  return n_diff;
};

var getGoalMetrics = function (objective) {
  if (typeof objective.measurement.unit_id === "undefined") {
    return "no metrics";
  }

  switch (objective.measurement.unit_id) {
    case 1:
      return "dollars";
      break;
    case 2:
      return "percentage";
      break;
    case 3:
      return "unit";
      break;
  }
};

const capitalize = word => {
  return word?.charAt(0)?.toUpperCase() + word?.slice(1);
};

const strToEllipsis = (maxLength, text) =>
  text.substring(0, maxLength) + " ...";

const strToMiddleEllipsis = (maxFirstLength, text) =>
  text.length > maxFirstLength ? text.substr(0, text.length - 15 > maxFirstLength ? maxFirstLength : text.length - 15) + '...' + text.substr(text.length - 10, text.length) : text;

const setLocalStorage = (key, value) => window.localStorage.setItem(key, value);
const getLocalStorage = key => window.localStorage.getItem(key);
const removeLocalStorage = key => window.localStorage.removeItem(key);
const setLocalStorageAmplitude = amplitudeInfo => localStorage.amplitudeInfo = JSON.stringify(amplitudeInfo);

const amplitudeAuth = async (type, role, cultureRole) => {
  const perfAction = type === "login" ? AmplitudeUtils?.login : AmplitudeUtils?.logout;
  const cultureAction = type === "login" ? AmplitudeUtils?.cultureLogin : AmplitudeUtils?.cultureLogout;
  if (role) perfAction?.();
  if (cultureRole) cultureAction?.();
}

const amplitudeLoginCultureOrPerf = async (role, cultureRole) => amplitudeAuth("login", role, cultureRole)
const amplitudeLogOutCultureOrPerf = async (role, cultureRole) => amplitudeAuth("logout", role, cultureRole)

const formatBytes = (bytes) => {
  if (bytes == 0) return '0 Bytes';
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const lowerCaseKeys = (object) => {
  let lowerCaseObject = {};
  for (let [key, value] of Object.entries(object)) {
    lowerCaseObject[key.toLowerCase()] = value;
  }

  return lowerCaseObject
}

const convertDataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

const getThumbnailVideo = (file) => {
  let filePromise = new Promise(resolve => {
    //get video data base64
    let videoSrc = ""
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = r => {
      videoSrc = r.target.result
    }

    //get video data + canvas thumbnail
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let blob = new Blob([fileReader.result], { type: file.type });
      let url = URL.createObjectURL(blob);
      let video = document.createElement('video');
      const timeupdate = () => {
        if (getThumbnailPreview()) {
          video.removeEventListener('timeupdate', timeupdate);
          video.pause();
        }
      };
      const getThumbnailPreview = () => {
        let canvas = document.createElement('canvas');
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        let currentPhoto = document.createElement('video');
        canvas.className = "aClassName";
        currentPhoto.type = "video"
        currentPhoto.src = canvas.toDataURL()
        currentPhoto.fileThumbnail = convertDataURLtoFile(canvas.toDataURL(), "thumbnailVideo.jpg")
        currentPhoto.videoSrc = videoSrc;
        currentPhoto.fileExtension = file.name.split('.').pop().toLowerCase()
        currentPhoto.file = file
        currentPhoto.width = video.videoWidth
        currentPhoto.height = video.videoHeight
        resolve(currentPhoto)
        URL.revokeObjectURL(url);
        return true;
      };
      video.addEventListener('timeupdate', timeupdate);
      video.preload = 'metadata';
      video.src = url;
      // Load video in Safari / IE11
      video.muted = true;
      video.playsInline = true;
      video.play();
    }
    fileReader.readAsArrayBuffer(file);
  })
  return { filePromise };
}

function titleize(string) {
  const firstLetterInEachWord = /(?:^|\s|-)\S/g;
  const underscore = /_/g;
  const dash = /-/g;

  return string && string
    .replace(underscore, " ")
    .replace(dash, " ")
    .replace(firstLetterInEachWord, letter => letter.toUpperCase());
}

const setMetaLinkTag = (logo, assets, applicationName) => {
  if (logo) {
    let link = document.querySelector('link[rel="shortcut icon"]');
    link.href = logo;

    let iconLink32 = document.querySelector('link[id="icon-32"]');
    iconLink32.href = logo;

    let appleLink = document.querySelector('link[rel="apple-touch-icon"]');
    appleLink.href = logo;

    let iconLink16 = document.querySelector('link[id="icon-16"]');
    iconLink16.href = logo;

    let safariLink = document.querySelector('link[rel="mask-icon"]')
    safariLink.href = logo;
  }

  if (assets?.mainColor) {
    let tileColor = document.querySelector('meta[name="msapplication-TileColor"]')
    tileColor.content = `hsl(${assets.mainColor}, 80%, 45%)`;

    let themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor.content = `hsl(${assets.mainColor}, 80%, 45%)`;
  }

  if (applicationName) {
    let appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]')
    appleTitle.content = applicationName;

    let appName = document.querySelector('meta[name="application-name"]')
    appName.content = applicationName;
  }
}

const copyToClipboard = (text) => {
  var textField = document.createElement('textarea')
  textField.innerText = text
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

const getLines = (ref) => {
  const element = getComputedStyle(ref.current);
  const height = parseInt(element.height);
  const lineHeight = parseInt(element.lineHeight);

  const lines = height / lineHeight;

  return lines;
}
function getUniqueArrayOfObjects(arr, keyComparison) {

  // store the comparison values in array
  const unique = arr.map(e => e[keyComparison])

    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the false indexes & return unique objects
    .filter((e) => arr[e]).map(e => arr[e]);

  return unique;
}

const getNested = (object, dotSeparatedKey) => {
  const customMatcher = /\[.*=.*\]/g
  let fallback;
  if (dotSeparatedKey[0] === "/") fallback = dotSeparatedKey.slice(1)
  else if (dotSeparatedKey[0] === "&") fallback = dotSeparatedKey[1] ? true : false

  if (dotSeparatedKey.match(customMatcher)) {
    let val = object
    dotSeparatedKey.split(".").map(key => {
      if (key) {
        if (key[0] === "[") {
          let [subKey, subVal] = key.slice(1, -1).split("=")
          val = val?.filter(k => k[subKey] === subVal)?.[0]
        } else {
          val = val[key]
        }
      }
    })
    return val;
  } else {
    return get(object, dotSeparatedKey, fallback)
  }
}

const getQuarterRange = (quarterType, year) => {
  const quarterRanges = {
    q1: { start: "-01-01", end: "-03-31" },
    q2: { start: "-04-01", end: "-06-30" },
    q3: { start: "-07-01", end: "-09-30" },
    q4: { start: "-10-01", end: "-12-31" },
    default: { start: "-01-01", end: "-12-31" },
  }
  const range = quarterType in quarterRanges ? quarterRanges[quarterType] : quarterRanges.default
  start = moment(year + range.start).toISOString();
  due = moment(year + range.end)
    .endOf("day")
    .toISOString();

  return { start, due }
}

const setPostType = type => {
  const isMultipleMedia = type.includes("_")
  if (isMultipleMedia) {
    let changesType = type.split("_")
    changesType[1] = capitalize(changesType[1])
    changesType = changesType.join("")
    return changesType
  }
  return type
}

const getENV = key => {
  const localStorageENV = JSON.parse(localStorage.getItem("env") || "{}")
  return localStorageENV?.[key] || env?.[key]
}

const getCssVariableValue = (variable) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable).replace('#', '').trim();
}

module.exports = {
  formattedNumber: formattedNumber,
  parseNewlinetoBr: parseNewlinetoBr,
  parseUrlinString: parseUrlinString,
  parseHashtaginString: parseHashtaginString,
  parseMentioninString: parseMentioninString,
  taggedUserTemplate: taggedUserTemplate,
  parseHttptoHttps: parseHttptoHttps,
  imageIsValid: imageIsValid,
  parseCaption: parseCaption,
  htmlToText: htmlToText,
  getLocalTeamName: getLocalTeamName,
  setLocalTeamName: setLocalTeamName,
  getLocalToken: getLocalToken,
  getLocalAppName: getLocalAppName,
  setLocalAppName: setLocalAppName,
  getLocalUserInfo: getLocalUserInfo,
  setLocalUserInfo: setLocalUserInfo,
  setLocalUserInfo: setLocalUserInfo,
  getLocalTeamLogo: getLocalTeamLogo,
  setLocalTeamLogo: setLocalTeamLogo,
  setAppStatus: setAppStatus,
  getAppStatus: getAppStatus,
  removeAllLocalStorage: removeAllLocalStorage,
  findIndexofArray: findIndexofArray,
  abortXHR: abortXHR,
  metricConvertion: metricConvertion,
  isPasswordValid: isPasswordValid,
  redirectToOrganizationPage: redirectToOrganizationPage,
  redirectTo404: redirectTo404,
  parseReadableFileSize: parseReadableFileSize,
  dateObjectRestructure: dateObjectRestructure,
  loadMoreValidator: loadMoreValidator,
  pasteRichTextHandler: pasteRichTextHandler,
  amplitudeAnalytic: amplitudeAnalytic,
  countObjectives: countObjectives,
  getMaxLevelObjectives: getMaxLevelObjectives,
  countDescendantsWithDifferentMetrics: countDescendantsWithDifferentMetrics,
  getGoalMetrics: getGoalMetrics,
  setObjectiveLocale: setObjectiveLocale,
  getObjectiveLocale: getObjectiveLocale,
  unregisterServiceWorker,
  capitalize,
  strToEllipsis,
  strToMiddleEllipsis,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  getUserToken,
  getDeviceId,
  getProvisionToken,
  formatBytes,
  setLocalStorageAmplitude,
  amplitudeLoginCultureOrPerf,
  amplitudeLogOutCultureOrPerf,
  lowerCaseKeys,
  getThumbnailVideo,
  titleize,
  setMetaLinkTag,
  copyToClipboard,
  getLines,
  getNested,
  getUniqueArrayOfObjects,
  getQuarterRange,
  setPostType,
  translateMarkdown,
  getENV,
  getCssVariableValue,
  getCultureLocale
}