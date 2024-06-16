import {SubscriptionController} from "../../controllers/subscription/index.js";

export class SubscriptionNotFound extends Error {}
export class SubscriptionCreationError extends Error {}
export class SubscriptionUseError extends Error {}