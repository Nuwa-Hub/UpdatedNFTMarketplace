import Message from '@/components/Message'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { publicRequest } from 'utils/requestMethods'

const index = () => {
    const nfts = [1, 1, 1, 1, 1]
    const [notifications, setNotifications] = useState([])
    const currentUser = useSelector((state) => state.user.currentUser);

    const getNotify = async () => {
        const notify = await publicRequest.get(`/notification/${currentUser.walletAdress}`);
        setNotifications(notify.data);
    }

    useEffect(() => {
        currentUser?.walletAdress&&getNotify()
    }, [currentUser])
    return (
        <div className='content-center justify-around flex flex-wrap mt-2'>
            {
                notifications.length > 0 && notifications.map((notification, index) => (
                    <Message key={index} notification={notification}/>
                ))}
        </div>
    )
}

export default index