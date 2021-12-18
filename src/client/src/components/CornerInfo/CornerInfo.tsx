import { config } from "app-shared/config";
import React, { FC } from "react";
import { Config } from "../../common";

import "./CornerInfo.scss"

interface CornerInfoProps {
  appName?: boolean;
}

const CornerInfo: FC<CornerInfoProps> = ({ appName }) => {

  return <div className="app-corner-info">
    { appName &&
      <h5 id="app-name">
        <a href="/">url-shortener</a>
      </h5>
    }
    <div id="app-version">
      v{config(Config.VERSION)}
    </div>
    <div id="signature">
      <span>
        by <a href="https://github.com/xkcm">xkcm</a>
      </span>
    </div>
  </div>
}

export default CornerInfo