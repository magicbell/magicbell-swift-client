**ENUM**

# `start_inbox_installation.Output`

**Contents**

- [Cases](#cases)
  - `created(_:)`
  - `undocumented(statusCode:_:)`
- [Properties](#properties)
  - `created`

```swift
@frozen public enum Output: Sendable, Hashable
```

## Cases
### `created(_:)`

```swift
case created(Operations.start_inbox_installation.Output.Created)
```

Created

- Remark: Generated from `#/paths//integrations/inbox/installations/start/post(start_inbox_installation)/responses/201`.

HTTP response code: `201 created`.

### `undocumented(statusCode:_:)`

```swift
case undocumented(statusCode: Swift.Int, OpenAPIRuntime.UndocumentedPayload)
```

Undocumented response.

A response with a code that is not documented in the OpenAPI document.

## Properties
### `created`

```swift
public var created: Operations.start_inbox_installation.Output.Created
```

The associated value of the enum case if `self` is `.created`.

- Throws: An error if `self` is not `.created`.
- SeeAlso: `.created`.