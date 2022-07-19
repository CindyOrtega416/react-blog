import React from "react";

export const excerpt = (str, count) => {
    if (str.length > count) {
        str = str.substring(0, count) + " ... ";
    }
    return str;
};

// shows only a determinate amount of text from the description
// how many letters we want to display
// it receives a string and a count (the number of letters we want t display). Ex, in BlogSection
    //excerpt(item.description, 120)