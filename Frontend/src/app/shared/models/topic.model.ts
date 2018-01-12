import {User} from './user.model';
export class Topic {
    id?: number;
    title?: string;
    content?: string;
    description?: string;
    datePublication?: string;
    sizeComments?: number;
    sizeVotes?: number;
    votedByConnectuser?: boolean;
    user?: User;
}
