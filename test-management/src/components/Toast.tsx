import {ReactNode} from 'react'; import {CheckCircle2,AlertCircle,X} from 'lucide-react';
export function Toast({message,type='success',onClose}:{message:string;type?:'success'|'error';onClose:()=>void}){return <div className={`toast ${type}`}><span>{type==='success'?<CheckCircle2/>:<AlertCircle/>}</span><div>{message}</div><button onClick={onClose}><X/></button></div>}
export function Empty({icon,children}:{icon?:ReactNode;children:ReactNode}){return <div className="empty">{icon}<h3>{children}</h3></div>}
