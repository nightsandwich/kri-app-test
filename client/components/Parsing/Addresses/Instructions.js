import React from "react";
import { Typography } from "@mui/material";

const Instructions = () => (
  <>
    <Typography  variant='subtitle1' >
      Paste in the subject's addresses (making sure to delete any unrelated lines such as 'Utility Locator...' or page headings). Both TLO and IRB formats will work, like in the examples below.
    </Typography>
    <Typography  variant='subtitle1' color='text.secondary'>
    ---TLO---
    </Typography>
    <Typography  variant='subtitle1' color='text.secondary'>
      4420 1ST PL NE APT 31, WASHINGTON, DC 20011-4954 (DISTRICT OF COLUMBIA COUNTY) (07/11/2019 to 07/11/2019) 
1823 CAMBRIDGE BLVD, COLUMBUS, OH 43212-1932 (FRANKLIN COUNTY) (04/01/2010 to 06/05/2014)
    </Typography>
    <Typography  variant='subtitle1' color='text.secondary'>
    ---IRB---
    </Typography>
    <Typography  variant='subtitle1' color='text.secondary'>
    7490 E DREYFUS AVE, SCOTTSDALE, AZ 85260-3909 MARICOPA 1823 CAMBRIDGE BLVD, COLUMBUS, OH 43212-1932 
    </Typography>
  </>
)

export default Instructions;