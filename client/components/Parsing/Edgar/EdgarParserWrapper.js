import React from "react";

import { Typography, Stack } from "@mui/material";

import edgarParser from './edgarParser'
import Parser from "../Parser";
import Instructions from "./Instructions";

const EdgarParserWrapper = () => {
  const searchLabel = 'Boolean Search String'
  const resultsLabel = 'EDGAR Pro Format'

  return (
    <Parser Instructions = {Instructions} searchLabel={searchLabel} resultsLabel={resultsLabel} parser={edgarParser} />
  )
}

export default EdgarParserWrapper;