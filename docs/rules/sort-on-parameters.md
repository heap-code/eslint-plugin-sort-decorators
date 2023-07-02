# Enforces order of parameters decorators (`sort-decorators/sort-on-parameters`)

💼⚠️ This rule is enabled in the 🔒 `strict` config. This rule _warns_ in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Sort decorators on parameters.

## Options

| Name            | Description                                                              | value           |
|:----------------|:-------------------------------------------------------------------------|:----------------|
| `autoFix`       | Automatically fix the order.<br/>Decorators order can matter at runtime. | _boolean_       |
| `caseSensitive` | If true, enforce properties to be in case-sensitive order.               | _boolean_       |
| `direction`     | Specify the direction of the ordering.                                   | `asc` \| `desc` |

> Definitive information in the [JSON schema](../../src/lib/sort-rule/sort-rule.options.schema.json).

### Defaults

This is the default values when the rule is enabled:

```json
{
 "sort-decorators/sort-on-parameters": [
    "warn",
    {
      "autoFix": false,
      "caseSensitive": true,
      "direction": "asc"
    }
  ]
}
```

### Usage

<details>
<summary>Usage of <code>"caseSensitive": false</code></summary>

#### Configuration

```json
{
 "sort-decorators/sort-on-parameters": [
    "warn",
    {
      "caseSensitive": false
    }
  ]
}
```

#### ❌ Invalid

```typescript
class MyClass {
  public run(@B @a @c parameter?: number) {}
}
```

#### ✅ Valid

```typescript
class MyClass {
  public run(@a @B @c parameter?: number) {}
}
```

</details>

<br />

<details>
<summary>Usage of <code>"direction": "desc"</code></summary>

#### Configuration

```json
{
  "sort-decorators/sort-on-parameters": [
    "warn",
    {
      "direction": "desc"
    }
  ]
}
```

#### ❌ Invalid

```typescript
class MyClass {
  public run(
    @A
    @B
    parameter?: number
  ) {}
}
```

#### ✅ Valid

```typescript
class MyClass {
  public run(
    @B
    @A
    parameter?: number
  ) {}
}
```

</details>

<br />
