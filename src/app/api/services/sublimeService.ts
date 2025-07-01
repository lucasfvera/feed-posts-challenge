/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { Card, CardTypeEnum } from '@/app/api/services/cards';

export type CardRequest = Card;

export interface Note {
	id: number;
	/** @maxLength 255 */
	text: string;
	/** @format date-time */
	created_at: string;
	/** @format date-time */
	updated_at: string;
	card: number;
}

export interface PaginatedCardList {
	/** @example 123 */
	count: number;
	/**
	 * @format uri
	 * @example "http://api.example.org/accounts/?page=4"
	 */
	next?: string | null;
	/**
	 * @format uri
	 * @example "http://api.example.org/accounts/?page=2"
	 */
	previous?: string | null;
	results: Card[];
}

export interface PaginatedNoteList {
	/** @example 123 */
	count: number;
	/**
	 * @format uri
	 * @example "http://api.example.org/accounts/?offset=400&limit=100"
	 */
	next?: string | null;
	/**
	 * @format uri
	 * @example "http://api.example.org/accounts/?offset=200&limit=100"
	 */
	previous?: string | null;
	results: Note[];
}

export interface PaginatedRelatedCardsList {
	/** @example 123 */
	count: number;
	/**
	 * @format uri
	 * @example "http://api.example.org/accounts/?page=4"
	 */
	next?: string | null;
	/**
	 * @format uri
	 * @example "http://api.example.org/accounts/?page=2"
	 */
	previous?: string | null;
	results: RelatedCards[];
}

export interface PatchedCard {
	id?: number;
	card_type?: CardTypeEnum;
	content?: any;
	/** @format date-time */
	created_at?: string;
	/** @format date-time */
	updated_at?: string;
	related?: number[];
	notes?: Note[];
	/**
	 * @maxLength 100
	 * @pattern ^[-a-zA-Z0-9_]+$
	 */
	slug?: string | null;
}

export interface PatchedNote {
	id?: number;
	/** @maxLength 255 */
	text?: string;
	/** @format date-time */
	created_at?: string;
	/** @format date-time */
	updated_at?: string;
	card?: number;
}

export type RelatedCards = Card;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<
	FullRequestParams,
	'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D, E> extends Response {
	data: D;
	error: E;
}

type CancelToken = symbol | string | number;

export enum ContentType {
	Json = 'application/json',
	JsonApi = 'application/vnd.api+json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = '';
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
		fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(
			typeof value === 'number' ? value : `${value}`
		)}`;
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter(
			(key) => 'undefined' !== typeof query[key]
		);
		return keys
			.map((key) =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key)
			)
			.join('&');
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : '';
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null &&
			(typeof input === 'object' || typeof input === 'string')
				? JSON.stringify(input)
				: input,
		[ContentType.JsonApi]: (input: any) =>
			input !== null &&
			(typeof input === 'object' || typeof input === 'string')
				? JSON.stringify(input)
				: input,
		[ContentType.Text]: (input: any) =>
			input !== null && typeof input !== 'string'
				? JSON.stringify(input)
				: input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
						? JSON.stringify(property)
						: `${property}`
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	};

	protected mergeRequestParams(
		params1: RequestParams,
		params2?: RequestParams
	): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected createAbortSignal = (
		cancelToken: CancelToken
	): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === 'boolean'
				? secure
				: this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter =
			this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;

		return this.customFetch(
			`${baseUrl || this.baseUrl || ''}${path}${
				queryString ? `?${queryString}` : ''
			}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== ContentType.FormData
						? { 'Content-Type': type }
						: {}),
				},
				signal:
					(cancelToken
						? this.createAbortSignal(cancelToken)
						: requestParams.signal) || null,
				body:
					typeof body === 'undefined' || body === null
						? null
						: payloadFormatter(body),
			}
		).then(async (response) => {
			const r = response.clone() as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data;
							} else {
								r.error = data;
							}
							return r;
						})
						.catch((e) => {
							r.error = e;
							return r;
						});

			if (cancelToken) {
				this.abortControllers.delete(cancelToken);
			}

			if (!response.ok) throw data;
			return data;
		});
	};
}

/**
 * @title No title
 * @version 0.0.0
 */
export class SublimeService<
	SecurityDataType
> extends HttpClient<SecurityDataType> {
	api = {
		/**
		 * No description
		 *
		 * @tags cards
		 * @name CardsList
		 * @request GET:/api/cards/
		 * @secure
		 */
		cardsList: (
			query?: {
				/** A page number within the paginated result set. */
				page?: number;
				/** Number of results to return per page. */
				page_size?: number;
				/** A search term. */
				search?: string;
			},
			params: RequestParams = {}
		) =>
			this.request<PaginatedCardList, any>({
				path: `/api/cards/`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				cache: 'force-cache',
				next: {
					revalidate: 3600,
				},
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags cards
		 * @name CardsCreate
		 * @request POST:/api/cards/
		 * @secure
		 */
		cardsCreate: (data: CardRequest, params: RequestParams = {}) =>
			this.request<Card, any>({
				path: `/api/cards/`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags cards
		 * @name CardsRetrieve
		 * @request GET:/api/cards/{id}/
		 * @secure
		 */
		cardsRetrieve: (id: number, params: RequestParams = {}) =>
			this.request<Card, any>({
				path: `/api/cards/${id}/`,
				method: 'GET',
				secure: true,
				format: 'json',
				cache: 'force-cache',
				next: {
					revalidate: 3600,
				},
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags cards
		 * @name CardsUpdate
		 * @request PUT:/api/cards/{id}/
		 * @secure
		 */
		cardsUpdate: (id: number, data: Card, params: RequestParams = {}) =>
			this.request<Card, any>({
				path: `/api/cards/${id}/`,
				method: 'PUT',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags cards
		 * @name CardsPartialUpdate
		 * @request PATCH:/api/cards/{id}/
		 * @secure
		 */
		cardsPartialUpdate: (
			id: number,
			data: PatchedCard,
			params: RequestParams = {}
		) =>
			this.request<Card, any>({
				path: `/api/cards/${id}/`,
				method: 'PATCH',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags cards
		 * @name CardsDestroy
		 * @request DELETE:/api/cards/{id}/
		 * @secure
		 */
		cardsDestroy: (id: number, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/cards/${id}/`,
				method: 'DELETE',
				secure: true,
				...params,
			}),

		/**
		 * @description Add a related card to the current card
		 *
		 * @tags cards
		 * @name CardsAddRelatedCardCreate
		 * @request POST:/api/cards/{id}/add_related_card/
		 * @secure
		 */
		cardsAddRelatedCardCreate: (
			id: number,
			data: {
				card_id: number;
			},
			params: RequestParams = {}
		) =>
			this.request<
				{
					message?: string;
				},
				{
					error?: string;
				}
			>({
				path: `/api/cards/${id}/add_related_card/`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * @description List all related cards for a specific card
		 *
		 * @tags cards
		 * @name CardsRelatedCardsList
		 * @request GET:/api/cards/{id}/related_cards/
		 * @secure
		 */
		cardsRelatedCardsList: (
			id: number,
			query?: {
				/** A page number within the paginated result set. */
				page?: number;
				/** Number of results to return per page. */
				page_size?: number;
				/** A search term. */
				search?: string;
			},
			params: RequestParams = {}
		) =>
			this.request<PaginatedRelatedCardsList, any>({
				path: `/api/cards/${id}/related_cards/`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				cache: 'force-cache',
				next: {
					revalidate: 3600,
				},
				...params,
			}),

		/**
		 * @description Remove a related card from the current card
		 *
		 * @tags cards
		 * @name CardsRemoveRelatedCardCreate
		 * @request POST:/api/cards/{id}/remove_related_card/
		 * @secure
		 */
		cardsRemoveRelatedCardCreate: (
			id: number,
			data: {
				card_id: number;
			},
			params: RequestParams = {}
		) =>
			this.request<
				{
					message?: string;
				},
				{
					error?: string;
				}
			>({
				path: `/api/cards/${id}/remove_related_card/`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags notes
		 * @name NotesList
		 * @request GET:/api/notes/
		 * @secure
		 */
		notesList: (
			query?: {
				/** Number of results to return per page. */
				limit?: number;
				/** The initial index from which to return the results. */
				offset?: number;
			},
			params: RequestParams = {}
		) =>
			this.request<PaginatedNoteList, any>({
				path: `/api/notes/`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags notes
		 * @name NotesCreate
		 * @request POST:/api/notes/
		 * @secure
		 */
		notesCreate: (data: Note, params: RequestParams = {}) =>
			this.request<Note, any>({
				path: `/api/notes/`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags notes
		 * @name NotesRetrieve
		 * @request GET:/api/notes/{id}/
		 * @secure
		 */
		notesRetrieve: (id: number, params: RequestParams = {}) =>
			this.request<Note, any>({
				path: `/api/notes/${id}/`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags notes
		 * @name NotesUpdate
		 * @request PUT:/api/notes/{id}/
		 * @secure
		 */
		notesUpdate: (id: number, data: Note, params: RequestParams = {}) =>
			this.request<Note, any>({
				path: `/api/notes/${id}/`,
				method: 'PUT',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags notes
		 * @name NotesPartialUpdate
		 * @request PATCH:/api/notes/{id}/
		 * @secure
		 */
		notesPartialUpdate: (
			id: number,
			data: PatchedNote,
			params: RequestParams = {}
		) =>
			this.request<Note, any>({
				path: `/api/notes/${id}/`,
				method: 'PATCH',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags notes
		 * @name NotesDestroy
		 * @request DELETE:/api/notes/{id}/
		 * @secure
		 */
		notesDestroy: (id: number, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/api/notes/${id}/`,
				method: 'DELETE',
				secure: true,
				...params,
			}),
	};
}
