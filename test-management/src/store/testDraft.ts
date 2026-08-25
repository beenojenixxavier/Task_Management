import {create} from 'zustand'; import type {Question,Test,TestFormValues} from '../types';
interface State{test:Test|null;form:Partial<TestFormValues>;questions:Question[];setTest:(test:Test|null)=>void;setForm:(form:Partial<TestFormValues>)=>void;setQuestions:(q:Question[])=>void;reset:()=>void}
export const useTestDraft=create<State>(set=>({test:null,form:{},questions:[],setTest:test=>set({test}),setForm:form=>set(s=>({form:{...s.form,...form}})),setQuestions:questions=>set({questions}),reset:()=>set({test:null,form:{},questions:[]})}));
