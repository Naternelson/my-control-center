import { Box } from "@mui/material";
import { useState } from "react"

export default function(){
    const [order, setOrder] = useState<string[]>([])
    const [active, setActive] = useState()
    return <Box display={"flex"} height={"20px"} sx={{outline: '1px solid white', overflow: "auto hidden"}}>

    </Box>
}