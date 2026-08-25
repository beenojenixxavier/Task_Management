import axios from 'axios';
import type {ApiResponse,Question,SubTopic,Subject,Test,Topic,User} from '../types';

const api=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||'https://admin-moderator-backend-staging.up.railway.app/api',timeout:20000,headers:{'Content-Type':'application/json'}});
api.interceptors.request.use(config=>{const token=localStorage.getItem('preproute_token'); if(token) config.headers.Authorization=`Bearer ${token}`; return config;});
api.interceptors.response.use(r=>r,e=>{if(e?.response?.status===401){localStorage.removeItem('preproute_token');localStorage.removeItem('preproute_user');window.location.href='/login';} return Promise.reject(e);});
export const getError=(e:unknown)=>{if(axios.isAxiosError(e)) return e.response?.data?.message||e.response?.data?.error||e.message; return e instanceof Error?e.message:'Something went wrong';};
export const authApi={login:async(userId:string,password:string)=>{const r=await api.post<ApiResponse<{token:string;user:User}>>('/auth/login',{userId,password});return r.data.data;}};
export const catalogApi={
 subjects:async()=> (await api.get<ApiResponse<Subject[]>>('/subjects')).data.data,
 topics:async(subjectId:string)=> (await api.get<ApiResponse<Topic[]>>(`/topics/subject/${subjectId}`)).data.data,
 subTopics:async(topicId:string)=> (await api.get<ApiResponse<SubTopic[]>>(`/sub-topics/topic/${topicId}`)).data.data,
 subTopicsByTopics:async(topicIds:string[])=> (await api.post<ApiResponse<SubTopic[]>>('/sub-topics/multi-topics',{topicIds})).data.data,
};
export const testsApi={
 list:async()=> (await api.get<ApiResponse<Test[]>>('/tests')).data.data,
 get:async(id:string)=> (await api.get<ApiResponse<Test>>(`/tests/${id}`)).data.data,
 create:async(payload:Partial<Test>)=> (await api.post<ApiResponse<Test>>('/tests',payload)).data.data,
 update:async(id:string,payload:Partial<Test>)=> (await api.put<ApiResponse<Test>>(`/tests/${id}`,payload)).data.data,
 remove:async(id:string)=> (await api.delete(`/tests/${id}`)).data,
};
export const questionsApi={
 bulkCreate:async(questions:Question[])=> (await api.post<ApiResponse<Question[]>>('/questions/bulk',{questions})).data.data,
 fetchBulk:async(ids:string[])=> (await api.post<ApiResponse<Question[]>>('/questions/fetchBulk',{question_ids:ids})).data.data,
 update:async(id:string,payload:Partial<Question>)=> (await api.put<ApiResponse<Question>>(`/questions/${id}`,payload)).data.data,
 remove:async(id:string)=> (await api.delete(`/questions/${id}`)).data,
};
