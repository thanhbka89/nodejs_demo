import tracer from 'tracer';
import { blue, white, magenta, green, yellow, cyan, redBright, gray, grey } from 'chalk';

const path = require('path');

const logColor = (str, color1, color2, color3) => {
  color3 = color3 || color1; //eslint-disable-line
  color2 = color2 || color1; //eslint-disable-line
  const [timestamp, message, fileLine] = str.split('>>colors<<');
  return color1(timestamp) + color2(message) + color3(fileLine);
};

const getLogger = () => {
  if (process.env.NODE_ENV === 'production') {
    return tracer.dailyfile({
      root: path.resolve(__dirname, '..', 'logs') || 'logs',
      logPathFormat: '{{root}}/{{prefix}}_{{date}}.log',
      splitFormat: 'yyyymmdd',
      maxLogFiles: 5,
      allLogsFileName: 'vlscmsbackend',
      level: process.env.MS_LOG_LEVEL || 2, // 'log':0, 'trace':1, 'debug':2, 'info':3, 'warn':4, 'error':5, 'fatal':6
      inspectOpt: {
        showHidden: false,
        depth: 5,
      },
    });
  }
  return tracer.console({
    format: '{{timestamp}} [{{title}}] >>colors<< {{message}} >>colors<< ({{file}}:{{line}})',
    dateformat: 'HH:MM:ss.l',
    filters: [
      {
        log: (str) => logColor(str, blue, white, yellow),
        trace: (str) => logColor(str, magenta),
        debug: (str) => logColor(str, grey, blue, gray),
        info: (str) => logColor(str, green),
        warn: (str) => logColor(str, yellow),
        error: (str) => logColor(str, cyan, redBright, yellow),
      },
    ],
  });
};

export default getLogger();
