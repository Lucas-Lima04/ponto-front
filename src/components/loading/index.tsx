import { ReactElement, ReactNode } from "react";
import "./style.css";

function Loading() {
    return(
        <div className={`modal-background visible`} style={{ display: 'flex' }}>
            <div className="loading">
                <div className="loadingio-spinner-rolling-8z2y65tbbs"><div className="ldio-qbcpwz0onen">
                <div></div>
                </div></div>
            </div>
        </div>
    )
}

export default Loading;