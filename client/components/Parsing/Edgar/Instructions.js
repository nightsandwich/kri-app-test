import React from "react";

import { Typography, Stack } from "@mui/material";

const Instructions = () => (
<Stack>
    <Typography  variant='subtitle1' >
    Paste in the boolean search string used for Lexis or ProQuest.
    </Typography>
    <Typography  variant='subtitle1' color='text.secondary'>
    ---Example---
    </Typography>
    <Typography  variant='subtitle1' color='text.secondary'>
    ((tom OR thomas) w/2 lastname) AND ("company name" OR (another w/2 name) OR (word AND word AND "multiple words"))
    </Typography>
</Stack>
)

export default Instructions;