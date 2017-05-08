import type {
  DocumentNode,
  ExecutionResult,
  GraphQLError,
  SelectionSetNode,
  FieldNode,
  InlineFragmentNode,
  ValueNode,
  SelectionNode,
  NameNode,
} from "graphql";
import type { RequestInit } from "fetch";
import type { Middleware } from "redux";
declare module "apollo-client" {
  declare export class NetworkInterface {
    [others: string]: any,
    query(request: Request): Promise<ExecutionResult>,
  }

  declare export interface BatchedNetworkInterface {
    batchQuery(requests: Request[]): Promise<ExecutionResult[]>,
  }

  declare export interface MiddlewareRequest {
    request: Request,
    options: RequestInit,
  }

  declare export interface MiddlewareInterface {
    applyMiddleware(
      this: HTTPFetchNetworkInterface,
      request: MiddlewareRequest,
      next: Function,
    ): void,
  }

  declare export interface BatchMiddlewareRequest {
    requests: Request[],
    options: RequestInit,
  }

  declare export interface BatchMiddlewareInterface {
    applyBatchMiddleware(
      this: HTTPBatchedNetworkInterface,
      request: BatchMiddlewareRequest,
      next: Function,
    ): void,
  }
  declare export interface AfterwareResponse {
    response: Response,
    options: RequestInit,
  }

  declare export interface AfterwareInterface {
    applyAfterware(
      this: HTTPFetchNetworkInterface,
      response: AfterwareResponse,
      next: Function,
    ): any,
  }

  declare export interface BatchAfterwareResponse {
    responses: Response[],
    options: RequestInit,
  }

  declare export interface BatchAfterwareInterface {
    applyBatchAfterware(
      this: HTTPBatchedNetworkInterface,
      response: BatchAfterwareResponse,
      next: Function,
    ): any,
  }
  declare export interface Request {
    [additionalKey: string]: any,
    debugName?: string,
    query?: DocumentNode,
    variables?: Object,
    operationName?: string,
  }

  declare export interface PrintedRequest {
    debugName?: string,
    query?: string,
    variables?: Object,
    operationName?: string,
  }

  declare export interface SubscriptionNetworkInterface {
    subscribe(
      request: Request,
      handler: (error: any, result: any) => void,
    ): number,
    unsubscribe(id: Number): void,
  }

  declare export type NetworkMiddleware =
    | MiddlewareInterface[]
    | BatchMiddlewareInterface[];
  declare export type NetworkAfterware =
    | AfterwareInterface[]
    | BatchAfterwareInterface[];

  declare export interface HTTPNetworkInterface {
    _uri: string,
    _opts: RequestInit,
    _middlewares: NetworkMiddleware,
    _afterwares: NetworkAfterware,
    use(middlewares: NetworkMiddleware): HTTPNetworkInterface,
    useAfter(afterwares: NetworkAfterware): HTTPNetworkInterface,
  }

  declare export interface BatchRequestAndOptions {
    requests: Request[],
    options: RequestInit,
  }

  declare export interface BatchResponseAndOptions {
    responses: Response[],
    options: RequestInit,
  }

  declare export interface BatchingNetworkInterfaceOptions {
    uri: string,
    batchInterval: number,
    opts?: RequestInit,
  }

  declare export function createBatchingNetworkInterface(
    options: BatchingNetworkInterfaceOptions,
  ): HTTPNetworkInterface;

  declare export class HTTPBatchedNetworkInterface
    extends BaseNetworkInterface {
    _middlewares: NetworkMiddleware,
    _afterwares: NetworkAfterware,
    constructor(
      uri: string,
      batchInterval: number,
      fetchOpts: RequestInit,
    ): this,
    query(request: Request): Promise<ExecutionResult>,
    batchQuery(requests: Request[]): Promise<ExecutionResult[]>,
    applyBatchMiddlewares(
      opts: BatchRequestAndOptions,
    ): Promise<BatchRequestAndOptions>,
    applyBatchAfterwares(
      opts: BatchResponseAndOptions,
    ): Promise<BatchResponseAndOptions>,
    use(middlewares: BatchMiddlewareInterface[]): HTTPNetworkInterface,
    useAfter(afterwares: BatchAfterwareInterface[]): HTTPNetworkInterface,
  }

  declare export interface RequestAndOptions {
    request: Request,
    options: RequestInit,
  }

  declare export interface ResponseAndOptions {
    response: Response,
    options: RequestInit,
  }

  declare export interface NetworkInterfaceOptions {
    uri?: string,
    opts?: RequestInit,
  }

  declare export function printRequest(request: Request): PrintedRequest;

  declare export function createNetworkInterface(
    uriOrInterfaceOpts: string | NetworkInterfaceOptions,
    secondArgOpts?: NetworkInterfaceOptions,
  ): HTTPNetworkInterface;

  declare export class BaseNetworkInterface extends NetworkInterface {
    _middlewares: NetworkMiddleware,
    _afterwares: NetworkAfterware,
    _uri: string,
    _opts: RequestInit,
    constructor(uri: string | void, opts?: RequestInit): this,
    query(request: Request): Promise<ExecutionResult>,
  }

  declare export class HTTPFetchNetworkInterface extends BaseNetworkInterface {
    _middlewares: NetworkMiddleware,
    _afterwares: NetworkAfterware,
    applyMiddlewares(
      requestAndOptions: RequestAndOptions,
    ): Promise<RequestAndOptions>,
    applyAfterwares(opts: ResponseAndOptions): Promise<ResponseAndOptions>,
    fetchFromRemoteEndpoint(opts: RequestAndOptions): Promise<Response>,
    query(request: Request): Promise<ExecutionResult>,
    use(middlewares: MiddlewareInterface[]): HTTPNetworkInterface,
    useAfter(afterwares: AfterwareInterface[]): HTTPNetworkInterface,
  }

  declare export type FetchPolicy =
    | "cache-first"
    | "cache-and-network"
    | "network-only"
    | "cache-only"
    | "standby";

  declare export type SubscribeToMoreOptions = {
    document: DocumentNode,
    variables?: {
      [key: string]: any,
    },
    updateQuery?: (
      previousQueryResult: Object,
      options: {
        subscriptionData: {
          data: any,
        },
        variables: {
          [key: string]: any,
        },
      },
    ) => Object,
    onError?: (error: Error) => void,
  };

  declare export type MutationUpdaterFn = (
    proxy: DataProxy,
    mutationResult: Object,
  ) => void;

  declare export interface ModifiableWatchQueryOptions {
    variables?: {
      [key: string]: any,
    },
    pollInterval?: number,
    fetchPolicy?: FetchPolicy,
    notifyOnNetworkStatusChange?: boolean,
    reducer?: OperationResultReducer,
  }

  declare export interface WatchQueryOptions {
    query: DocumentNode,
    metadata?: any,
  }

  declare export interface FetchMoreQueryOptions {
    query?: DocumentNode,
    variables?: {
      [key: string]: any,
    },
  }

  declare export interface SubscriptionOptions {
    query: DocumentNode,
    variables?: {
      [key: string]: any,
    },
  }

  declare export interface MutationOptions {
    mutation: DocumentNode,
    variables?: Object,
    optimisticResponse?: Object,
    updateQueries?: MutationQueryReducersMap,
    refetchQueries?: string[] | PureQueryOptions[],
    update?: MutationUpdaterFn,
  }

  declare export type QueryListener = (
    queryStoreValue: QueryStoreValue,
  ) => void;
  declare export type FetchType = number;
  declare export type PureQueryOptions = {
    query: DocumentNode,
    variables?: {
      [key: string]: any,
    },
  };

  declare export type ApolloQueryResult<T> = {
    data: T,
    loading: boolean,
    networkStatus: NetworkStatus,
    stale: boolean,
  };

  declare export type IdGetter = (value: Object) => string | null | void;

  declare export type ListValue = Array<null | IdValue>;

  declare export type StoreValue =
    | number
    | string
    | string[]
    | IdValue
    | ListValue
    | JsonValue
    | null
    | void;

  declare export interface NormalizedCache {
    [dataId: string]: StoreObject,
  }

  declare export interface StoreObject {
    [storeFieldKey: string]: StoreValue,
    ___typename?: string,
  }

  declare export interface IdValue {
    type: "id",
    id: string,
    generated: boolean,
  }

  declare export interface JsonValue {
    type: "json",
    json: any,
  }

  declare export function valueToObjectRepresentation(
    argObj: any,
    name: NameNode,
    value: ValueNode,
    variables?: Object,
  ): void;

  declare export function storeKeyNameFromField(
    field: FieldNode,
    variables?: Object,
  ): string;

  declare export function storeKeyNameFromFieldNameAndArgs(
    fieldName: string,
    args?: Object,
  ): string;

  declare export function resultKeyNameFromField(field: FieldNode): string;

  declare export function isField(selection: SelectionNode): FieldNode;

  declare export function isInlineFragment(
    selection: SelectionNode,
  ): InlineFragmentNode;

  declare export function graphQLResultHasError(result: ExecutionResult):
    | number
    | void;

  declare export function isIdValue(idObject: StoreValue): IdValue;

  declare export function toIdValue(id: string, generated?: boolean): IdValue;

  declare export function isJsonValue(jsonObject: StoreValue): JsonValue;

  declare export type MutationQueryReducer = (
    previousResult: Object,
    options: {
      mutationResult: Object,
      queryName: Object,
      queryVariables: Object,
    },
  ) => Object;

  declare export type MutationQueryReducersMap = {
    [queryName: string]: MutationQueryReducer,
  };

  declare export type OperationResultReducer = (
    previousResult: Object,
    action: ApolloAction,
    variables: Object,
  ) => Object;

  declare export type OperationResultReducerMap = {
    [queryId: string]: OperationResultReducer,
  };

  declare export type ApolloCurrentResult<T> = {
    data: T | {},
    loading: boolean,
    networkStatus: NetworkStatus,
    error?: ApolloError,
    partial?: boolean,
  };

  declare export interface FetchMoreOptions {
    updateQuery: (
      previousQueryResult: Object,
      options: {
        fetchMoreResult: Object,
        queryVariables: Object,
      },
    ) => Object,
  }

  declare export interface UpdateQueryOptions {
    variables?: Object,
  }

  declare export class ObservableQuery<T>
    extends Observable<ApolloQueryResult<T>> {
    options: WatchQueryOptions,
    queryId: string,
    variables: {
      [key: string]: any,
    },
    constructor(
      data: {
        scheduler: QueryScheduler,
        options: WatchQueryOptions,
        shouldSubscribe?: boolean,
      },
    ): this,
    result(): Promise<ApolloQueryResult<T>>,
    currentResult(): ApolloCurrentResult<T>,
    getLastResult(): ApolloQueryResult<T>,
    refetch(variables?: any): Promise<ApolloQueryResult<T>>,
    fetchMore(
      fetchMoreOptions: FetchMoreQueryOptions & FetchMoreOptions,
    ): Promise<ApolloQueryResult<T>>,
    subscribeToMore(options: SubscribeToMoreOptions): () => void,
    setOptions(
      opts: ModifiableWatchQueryOptions,
    ): Promise<ApolloQueryResult<T>>,
    setVariables(
      variables: any,
      tryFetch?: boolean,
    ): Promise<ApolloQueryResult<T>>,
    updateQuery(
      mapFn: (previousQueryResult: any, options: UpdateQueryOptions) => any,
    ): void,
    stopPolling(): void,
    startPolling(pollInterval: number): void,
  }

  declare export type CleanupFunction = () => void;

  declare export type SubscriberFunction<T> = (observer: Observer<T>) =>
    | Subscription
    | CleanupFunction;

  declare export interface Observer<T> {
    next?: (value: T) => void,
    error?: (error: Error) => void,
    complete?: () => void,
  }

  declare export interface Subscription {
    unsubscribe: CleanupFunction,
  }

  declare export class Observable<T> {
    constructor(subscriberFunction: SubscriberFunction<T>): this,
    subscribe(observer: Observer<T>): Subscription,
  }

  declare export type NetworkStatus = number;
  declare export function isNetworkRequestInFlight(
    networkStatus: NetworkStatus,
  ): boolean;

  declare export interface MutationStore {
    [mutationId: string]: MutationStoreValue,
  }

  declare export interface MutationStoreValue {
    mutationString: string,
    variables: Object,
    loading: boolean,
    error: Error | null,
  }

  declare export type IntrospectionResultData = {
    ___schema: {
      types: [{
        kind: string,
        name: string,
        possibleTypes: [{
          name: string,
        }],
      }],
    },
  };

  declare export class FragmentMatcherInterface {
    match(
      idValue: IdValue,
      typeCondition: string,
      context: ReadStoreContext,
    ): boolean,
  }

  declare export class IntrospectionFragmentMatcher
    extends FragmentMatcherInterface {
    constructor(
      options?: {
        introspectionQueryResultData?: IntrospectionResultData,
      },
    ): this,
    match(
      idValue: IdValue,
      typeCondition: string,
      context: ReadStoreContext,
    ): boolean,
  }

  declare export class HeuristicFragmentMatcher
    extends FragmentMatcherInterface {
    constructor(): this,
    ensureReady(): Promise<void>,
    canBypassInit(): boolean,
    match(
      idValue: IdValue,
      typeCondition: string,
      context: ReadStoreContext,
    ): boolean,
  }

  declare export interface DataProxyReadQueryOptions {
    query: DocumentNode,
    variables?: Object,
  }

  declare export interface DataProxyReadFragmentOptions {
    id: string,
    fragment: DocumentNode,
    fragmentName?: string,
    variables?: Object,
  }

  declare export interface DataProxyWriteQueryOptions {
    data: any,
    query: DocumentNode,
    variables?: Object,
  }

  declare export interface DataProxyWriteFragmentOptions {
    data: any,
    id: string,
    fragment: DocumentNode,
    fragmentName?: string,
    variables?: Object,
  }

  declare export class DataProxy {
    readQuery<QueryType>(options: DataProxyReadQueryOptions): QueryType,
    readFragment<FragmentType>(options: DataProxyReadFragmentOptions):
      | FragmentType
      | null,
    writeQuery(options: DataProxyWriteQueryOptions): void,
    writeFragment(options: DataProxyWriteFragmentOptions): void,
  }

  declare export class ReduxDataProxy extends DataProxy {
    constructor(
      store: ApolloStore,
      reduxRootSelector: (state: any) => Store,
      fragmentMatcher: FragmentMatcherInterface,
      reducerConfig: ApolloReducerConfig,
    ): this,
    readQuery<QueryType>(options: DataProxyReadQueryOptions): QueryType,
    readFragment<FragmentType>(options: DataProxyReadFragmentOptions):
      | FragmentType
      | null,
    writeQuery(options: DataProxyWriteQueryOptions): void,
    writeFragment(options: DataProxyWriteFragmentOptions): void,
  }

  declare export class TransactionDataProxy extends DataProxy {
    constructor(
      data: NormalizedCache,
      reducerConfig: ApolloReducerConfig,
    ): this,
    finish(): Array<DataWrite>,
    readQuery<QueryType>(options: DataProxyReadQueryOptions): QueryType,
    readFragment<FragmentType>(options: DataProxyReadFragmentOptions):
      | FragmentType
      | null,
    writeQuery(options: DataProxyWriteQueryOptions): void,
    writeFragment(options: DataProxyWriteFragmentOptions): void,
  }

  declare export type QueryResultAction = {
    type: "APOLLO_QUERY_RESULT",
    result: ExecutionResult,
    queryId: string,
    document: DocumentNode,
    operationName: string,
    requestId: number,
    fetchMoreForQueryId?: string,
    extraReducers?: ApolloReducer[],
  };

  declare export type ApolloAction =
    | QueryResultAction
    | QueryErrorAction
    | QueryInitAction
    | QueryResultClientAction
    | QueryStopAction
    | MutationInitAction
    | MutationResultAction
    | MutationErrorAction
    | UpdateQueryResultAction
    | StoreResetAction
    | SubscriptionResultAction
    | WriteAction;

  declare export function mutations(
    previousState: MutationStore | void,
    action: ApolloAction,
  ): MutationStore;

  declare export interface QueryErrorAction {
    type: "APOLLO_QUERY_ERROR",
    error: Error,
    queryId: string,
    requestId: number,
    fetchMoreForQueryId?: string,
  }

  declare export interface QueryInitAction {
    type: "APOLLO_QUERY_INIT",
    queryString: string,
    document: DocumentNode,
    variables: Object,
    fetchPolicy: FetchPolicy,
    queryId: string,
    requestId: number,
    storePreviousVariables: boolean,
    isRefetch: boolean,
    isPoll: boolean,
    fetchMoreForQueryId?: string,
    metadata: any,
  }

  declare export interface QueryResultClientAction {
    type: "APOLLO_QUERY_RESULT_CLIENT",
    result: ExecutionResult,
    complete: boolean,
    queryId: string,
    requestId: number,
  }

  declare export interface QueryStopAction {
    type: "APOLLO_QUERY_STOP",
    queryId: string,
  }

  declare export interface MutationInitAction {
    type: "APOLLO_MUTATION_INIT",
    mutationString: string,
    mutation: DocumentNode,
    variables: Object,
    operationName: string,
    mutationId: string,
    optimisticResponse: Object | void,
    extraReducers?: ApolloReducer[],
    updateQueries?: {
      [queryId: string]: MutationQueryReducer,
    },
    update?: (proxy: DataProxy, mutationResult: Object) => void,
  }

  declare export interface MutationResultAction {
    type: "APOLLO_MUTATION_RESULT",
    result: ExecutionResult,
    document: DocumentNode,
    operationName: string,
    variables: Object,
    mutationId: string,
    extraReducers?: ApolloReducer[],
    updateQueries?: {
      [queryId: string]: MutationQueryReducer,
    },
    update?: (proxy: DataProxy, mutationResult: Object) => void,
  }

  declare export interface MutationErrorAction {
    type: "APOLLO_MUTATION_ERROR",
    error: Error,
    mutationId: string,
  }

  declare export interface UpdateQueryResultAction {
    type: "APOLLO_UPDATE_QUERY_RESULT",
    variables: any,
    document: DocumentNode,
    newResult: Object,
  }

  declare export interface StoreResetAction {
    type: "APOLLO_STORE_RESET",
    observableQueryIds: string[],
  }

  declare export interface SubscriptionResultAction {
    type: "APOLLO_SUBSCRIPTION_RESULT",
    result: ExecutionResult,
    subscriptionId: number,
    variables: Object,
    document: DocumentNode,
    operationName: string,
    extraReducers?: ApolloReducer[],
  }

  declare export interface DataWrite {
    rootId: string,
    result: any,
    document: DocumentNode,
    variables: Object,
  }

  declare export interface WriteAction {
    type: "APOLLO_WRITE",
    writes: Array<DataWrite>,
  }

  declare export function isQueryResultAction(
    action: ApolloAction,
  ): QueryResultAction;

  declare export function isQueryErrorAction(
    action: ApolloAction,
  ): QueryErrorAction;

  declare export function isQueryInitAction(
    action: ApolloAction,
  ): QueryInitAction;

  declare export function isQueryResultClientAction(
    action: ApolloAction,
  ): QueryResultClientAction;

  declare export function isQueryStopAction(
    action: ApolloAction,
  ): QueryStopAction;

  declare export function isMutationInitAction(
    action: ApolloAction,
  ): MutationInitAction;

  declare export function isMutationResultAction(
    action: ApolloAction,
  ): MutationResultAction;

  declare export function isMutationErrorAction(
    action: ApolloAction,
  ): MutationErrorAction;

  declare export function isUpdateQueryResultAction(
    action: ApolloAction,
  ): UpdateQueryResultAction;

  declare export function isStoreResetAction(
    action: ApolloAction,
  ): StoreResetAction;

  declare export function isSubscriptionResultAction(
    action: ApolloAction,
  ): SubscriptionResultAction;

  declare export function isWriteAction(action: ApolloAction): WriteAction;

  declare export type ApolloStateSelector = (state: any) => Store;
  declare export class ApolloError extends Error {
    message: string,
    graphQLErrors: GraphQLError[],
    networkError: Error | null,
    extraInfo: any,
    constructor(info: ErrorConstructor): this,
  }
  declare export function isApolloError(err: Error): ApolloError;
  declare interface ErrorConstructor {
    graphQLErrors?: GraphQLError[],
    networkError?: Error | null,
    errorMessage?: string,
    extraInfo?: any,
  }

  declare export type OptimisticStoreItem = {
    mutationId: string,
    data: NormalizedCache,
  };

  declare export type OptimisticStore = OptimisticStoreItem[];

  declare export interface Store {
    data: NormalizedCache,
    queries: QueryStore,
    mutations: MutationStore,
    optimistic: OptimisticStore,
    reducerError: ReducerError | null,
  }

  declare export interface ApolloStore {
    dispatch: (action: ApolloAction) => void,
    getState: () => any,
  }
  declare export type ApolloReducer = (
    store: NormalizedCache,
    action: ApolloAction,
  ) => NormalizedCache;

  declare export type ApolloReducerConfig = {
    dataIdFromObject?: IdGetter,
    customResolvers?: CustomResolverMap,
    fragmentMatcher?: FragmentMatcher,
    addTypename?: boolean,
  };

  declare export interface ReducerError {
    error: Error,
    queryId?: string,
    mutationId?: string,
    subscriptionId?: number,
  }

  declare export function getDataWithOptimisticResults(
    store: Store,
  ): NormalizedCache;

  declare export function optimistic(
    previousState: any[] | void,
    action: any,
    store: any,
    config: any,
  ): OptimisticStore;

  declare export type QueryStoreValue = {
    queryString: string,
    document: DocumentNode,
    variables: Object,
    previousVariables: Object | null,
    networkStatus: NetworkStatus,
    networkError: Error | null,
    graphQLErrors: GraphQLError[],
    lastRequestId: number,
    metadata: any,
  };

  declare export interface QueryStore {
    [queryId: string]: QueryStoreValue,
  }

  declare export interface SelectionSetWithRoot {
    id: string,
    typeName: string,
    selectionSet: SelectionSetNode,
  }

  declare export function queries(
    previousState: QueryStore | void,
    action: ApolloAction,
  ): QueryStore;

  declare type FragmentMatcher = (
    rootValue: any,
    typeCondition: string,
    context: any,
  ) => boolean;

  declare export type DiffResult = {
    result?: any,
    isMissing?: boolean,
  };

  declare export type ReadQueryOptions = {
    store: NormalizedCache,
    query: DocumentNode,
    fragmentMatcherFunction?: FragmentMatcher,
    variables?: Object,
    previousResult?: any,
    rootId?: string,
    config?: ApolloReducerConfig,
  };

  declare export type DiffQueryAgainstStoreOptions =
    & ReadQueryOptions
    & {
      returnPartialData?: boolean,
    };

  declare export type CustomResolver = (
    rootValue: any,
    args: {
      [argName: string]: any,
    },
  ) => any;

  declare export type CustomResolverMap = {
    [typeName: string]: {
      [fieldName: string]: CustomResolver,
    },
  };

  declare export type ReadStoreContext = {
    store: NormalizedCache,
    returnPartialData: boolean,
    hasMissingField: boolean,
    customResolvers: CustomResolverMap,
  };

  declare export function readQueryFromStore<QueryType>(
    options: ReadQueryOptions,
  ): QueryType;

  declare export function diffQueryAgainstStore(
    result: DiffQueryAgainstStoreOptions,
  ): DiffResult;

  declare export function assertIdValue(idValue: IdValue): void;

  declare export class QueryScheduler {
    inFlightQueries: {
      [queryId: string]: WatchQueryOptions,
    },
    registeredQueries: {
      [queryId: string]: WatchQueryOptions,
    },
    intervalQueries: {
      [interval: number]: string[],
    },
    queryManager: QueryManager,
    constructor(
      queryManager: {
        queryManager: QueryManager,
      },
    ): this,
    checkInFlight(queryId: string): boolean,
    fetchQuery<T>(
      queryId: string,
      options: WatchQueryOptions,
      fetchType: FetchType,
    ): Promise<{}>,
    startPollingQuery<T>(
      options: WatchQueryOptions,
      queryId: string,
      listener?: QueryListener,
    ): string,
    stopPollingQuery(queryId: string): void,
    fetchQueriesOnInterval<T>(interval: number): void,
    addQueryOnInterval<T>(
      queryId: string,
      queryOptions: WatchQueryOptions,
    ): void,
    registerPollingQuery<T>(
      queryOptions: WatchQueryOptions,
    ): ObservableQuery<T>,
  }

  declare export function createApolloReducer(config: ApolloReducerConfig): (
    state: Store,
    action: ApolloAction,
  ) => Store;

  declare export function createApolloStore(
    init?: {
      reduxRootKey?: string,
      initialState?: any,
      config?: ApolloReducerConfig,
      reportCrashes?: boolean,
      logger?: Middleware,
    },
  ): ApolloStore;

  declare export function createApolloReducer(config: ApolloReducerConfig): (
    state: Store,
    action: ApolloAction,
  ) => Store;

  declare export function createApolloStore(
    store?: {
      reduxRootKey?: string,
      initialState?: any,
      config?: ApolloReducerConfig,
      reportCrashes?: boolean,
      logger?: Middleware,
    },
  ): ApolloStore;

  declare export class QueryManager {
    pollingTimers: {
      [queryId: string]: any,
    },
    scheduler: QueryScheduler,
    store: ApolloStore,
    networkInterface: NetworkInterface,
    ssrMode: boolean,
    constructor(
      setup: {
        networkInterface: NetworkInterface,
        store: ApolloStore,
        reduxRootSelector: ApolloStateSelector,
        fragmentMatcher?: FragmentMatcherInterface,
        reducerConfig?: ApolloReducerConfig,
        addTypename?: boolean,
        queryDeduplication?: boolean,
        ssrMode?: boolean,
      },
    ): this,
    broadcastNewStore(store: any): void,
    mutate<T>(
      mutationOpts: {
        mutation: DocumentNode,
        variables?: Object,
        optimisticResponse?: Object,
        updateQueries?: MutationQueryReducersMap,
        refetchQueries?: string[] | PureQueryOptions[],
        update?: (proxy: DataProxy, mutationResult: Object) => void,
      },
    ): Promise<ApolloQueryResult<T>>,
    fetchQuery<T>(
      queryId: string,
      options: WatchQueryOptions,
      fetchType?: FetchType,
      fetchMoreForQueryId?: string,
    ): Promise<ApolloQueryResult<T>>,
    queryListenerForObserver<T>(
      queryId: string,
      options: WatchQueryOptions,
      observer: Observer<ApolloQueryResult<T>>,
    ): QueryListener,
    watchQuery<T>(
      options: WatchQueryOptions,
      shouldSubscribe?: boolean,
    ): ObservableQuery<T>,
    query<T>(options: WatchQueryOptions): Promise<ApolloQueryResult<T>>,
    generateQueryId(): string,
    stopQueryInStore(queryId: string): void,
    getApolloState(): Store,
    selectApolloState(store: any): Store,
    getInitialState(): {
      data: Object,
    },
    getDataWithOptimisticResults(): NormalizedCache,
    addQueryListener(queryId: string, listener: QueryListener): void,
    addFetchQueryPromise<T>(
      requestId: number,
      promise: Promise<ApolloQueryResult<T>>,
      resolve: (result: ApolloQueryResult<T>) => void,
      reject: (error: Error) => void,
    ): void,
    removeFetchQueryPromise(requestId: number): void,
    addObservableQuery<T>(
      queryId: string,
      observableQuery: ObservableQuery<T>,
    ): void,
    removeObservableQuery(queryId: string): void,
    resetStore(): void,
    startQuery<T>(
      queryId: string,
      options: WatchQueryOptions,
      listener: QueryListener,
    ): string,
    startGraphQLSubscription(options: SubscriptionOptions): Observable<any>,
    removeQuery(queryId: string): void,
    stopQuery(queryId: string): void,
    getCurrentQueryResult<T>(
      observableQuery: ObservableQuery<T>,
      isOptimistic?: boolean,
    ): any,
    getQueryWithPreviousResult<T>(
      queryIdOrObservable: string | ObservableQuery<T>,
      isOptimistic?: boolean,
    ): {
      previousResult: any,
      variables:
        | {
            [key: string]: any,
          }
        | void,
      document: DocumentNode,
    },
  }

  declare export class ApolloClient extends DataProxy {
    networkInterface: NetworkInterface,
    store: ApolloStore,
    reduxRootSelector: ApolloStateSelector | null,
    initialState: any,
    queryManager: QueryManager,
    reducerConfig: ApolloReducerConfig,
    addTypename: boolean,
    disableNetworkFetches: boolean,
    dataId: IdGetter | void,
    dataIdFromObject: IdGetter | void,
    fieldWithArgs: (fieldName: string, args?: Object) => string,
    version: string,
    queryDeduplication: boolean,
    constructor(
      options?: {
        networkInterface?: NetworkInterface,
        reduxRootSelector?: string | ApolloStateSelector,
        initialState?: any,
        dataIdFromObject?: IdGetter,
        ssrMode?: boolean,
        ssrForceFetchDelay?: number,
        addTypename?: boolean,
        customResolvers?: CustomResolverMap,
        connectToDevTools?: boolean,
        queryDeduplication?: boolean,
        fragmentMatcher?: FragmentMatcherInterface,
      },
    ): this,
    watchQuery<T>(options: WatchQueryOptions): ObservableQuery<T>,
    query<T>(options: WatchQueryOptions): Promise<ApolloQueryResult<T>>,
    mutate<T>(options: MutationOptions): Promise<ApolloQueryResult<T>>,
    subscribe(options: SubscriptionOptions): Observable<any>,
    readQuery<T>(options: DataProxyReadQueryOptions): T,
    readFragment<T>(options: DataProxyReadFragmentOptions): T | null,
    writeQuery(options: DataProxyWriteQueryOptions): void,
    writeFragment(options: DataProxyWriteFragmentOptions): void,
    reducer(): (state: Store, action: ApolloAction) => Store,
    ___actionHookForDevTools(cb: Function): void,
    middleware: () => (store: ApolloStore) => (next: any) => (
      action: any,
    ) => any,
    initStore(): void,
    resetStore(): void,
    getInitialState(): {
      data: Object,
    },
  }
  declare export default typeof ApolloClient
}
