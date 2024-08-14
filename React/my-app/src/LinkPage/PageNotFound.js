import { useInsertionEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
export function PageNotFound() {
    const navigate = useNavigate();
    return "Not found";
    
}