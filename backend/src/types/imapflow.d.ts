// Minimal ambient typings for the subset of the `imapflow` API used in this project.
// The installed imapflow version ships a lib/imap-flow.d.ts file, but TypeScript's
// module resolution doesn't always pick it up automatically across environments,
// so we declare just what we use here to keep the build reliable.
declare module 'imapflow' {
  export interface ImapFlowOptions {
    host: string;
    port: number;
    secure?: boolean;
    auth: { user: string; pass: string };
    logger?: false | Record<string, unknown>;
  }

  export interface EnvelopeAddress {
    name?: string;
    address?: string;
  }

  export interface Envelope {
    date?: Date;
    subject?: string;
    from?: EnvelopeAddress[];
    to?: EnvelopeAddress[];
    messageId?: string;
    inReplyTo?: string;
  }

  export interface MailboxObject {
    uidNext: number;
    [key: string]: unknown;
  }

  export interface FetchQueryOptions {
    envelope?: boolean;
    source?: boolean;
    uid?: boolean;
    [key: string]: unknown;
  }

  export interface FetchMessageObject {
    uid: number;
    envelope?: Envelope;
    source?: Buffer;
    [key: string]: unknown;
  }

  export class ImapFlow {
    constructor(options: ImapFlowOptions);
    connect(): Promise<void>;
    logout(): Promise<void>;
    mailboxOpen(path: string): Promise<MailboxObject>;
    fetch(range: string, query: FetchQueryOptions): AsyncIterable<FetchMessageObject>;
  }
}
