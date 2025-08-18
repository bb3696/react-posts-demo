import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function Button(){

    const [count, setCount] = useState(0);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        
        </>
    )
}

export default Button;