import React from "react";

import { Typography } from "@mui/material";

import Parser from "../Parser";
import Instructions from "./Instructions";
import addressParser from "./addressParser";

const AddressParserWrapper = () => {
  const searchLabel = 'Addresses String'      
  const resultsLabel = 'Boolean Format'      
  return (
    <Parser Instructions = {Instructions} searchLabel={searchLabel} resultsLabel={resultsLabel} parser={addressParser} />
  )
}

export default AddressParserWrapper;