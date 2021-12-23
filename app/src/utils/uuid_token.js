import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    let uuid = localStorage.getItem('UUID_TOKEN')
    if (!uuid) {
        // uuid不存在
        uuid = uuidv4()
        localStorage.setItem('UUID_TOKEN', uuid)
    }

    return uuid
}