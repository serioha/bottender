/* @flow */
import warning from 'warning';

import * as constants from '../constants';

import BasicHandlerBuilder, {
  type Predicate,
  type Handler,
  type Pattern,
  normalizeHandler,
  matchPattern,
} from './BasicHandlerBuilder';

export default class TelegramHandlerBuilder extends BasicHandlerBuilder {
  onMessage(predicate: Predicate, handler: Handler) {
    this.on(context => context.event.isMessage && predicate(context), handler);
    return this;
  }

  onText(pattern: Pattern, handler: Handler) {
    warning(
      typeof pattern === 'string' || pattern instanceof RegExp,
      `'onText' only accepts string or regex, but received ${typeof pattern}`
    );
    this.onMessage(
      context =>
        context.event.isTextMessage &&
        matchPattern(pattern, context.event.message.text),
      handler
    );
    return this;
  }
}
