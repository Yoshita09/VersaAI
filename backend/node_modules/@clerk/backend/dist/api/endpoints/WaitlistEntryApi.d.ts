import type { ClerkPaginationRequest } from '@clerk/types';
import type { DeletedObject } from '../resources/DeletedObject';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { WaitlistEntryStatus } from '../resources/Enums';
import type { WaitlistEntry } from '../resources/WaitlistEntry';
import { AbstractAPI } from './AbstractApi';
import type { WithSign } from './util-types';
type WaitlistEntryListParams = ClerkPaginationRequest<{
    /**
     * Filter waitlist entries by `email_address` or `id`
     */
    query?: string;
    status?: WaitlistEntryStatus;
    orderBy?: WithSign<'created_at' | 'invited_at' | 'email_address'>;
}>;
type WaitlistEntryCreateParams = {
    emailAddress: string;
    notify?: boolean;
};
type WaitlistEntryInviteParams = {
    /**
     * When true, do not error if an invitation already exists. Default: false.
     */
    ignoreExisting?: boolean;
};
export declare class WaitlistEntryAPI extends AbstractAPI {
    /**
     * List waitlist entries.
     * @param params Optional parameters (e.g., `query`, `status`, `orderBy`).
     */
    list(params?: WaitlistEntryListParams): Promise<PaginatedResourceResponse<WaitlistEntry>>;
    /**
     * Create a waitlist entry.
     * @param params The parameters for creating a waitlist entry.
     */
    create(params: WaitlistEntryCreateParams): Promise<WaitlistEntry>;
    /**
     * Invite a waitlist entry.
     * @param id The waitlist entry ID.
     * @param params Optional parameters (e.g., `ignoreExisting`).
     */
    invite(id: string, params?: WaitlistEntryInviteParams): Promise<WaitlistEntry>;
    /**
     * Reject a waitlist entry.
     * @param id The waitlist entry ID.
     */
    reject(id: string): Promise<WaitlistEntry>;
    /**
     * Delete a waitlist entry.
     * @param id The waitlist entry ID.
     */
    delete(id: string): Promise<DeletedObject>;
}
export {};
//# sourceMappingURL=WaitlistEntryApi.d.ts.map