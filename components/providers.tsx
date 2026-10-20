 'use client';import {useState} from 'react';import {Provider} from 'react-redux';import {SessionProvider} from 'next-auth/react';import {makeStore,type AppStore} from '@/store';
export default function Providers({children}:{children:React.ReactNode}){const [store] = useState<AppStore>(() => makeStore());return <SessionProvider><Provider store={store}>{children}</Provider></SessionProvider>;}
