# @nafw/result

This is a project for retaking control over the execution flow.

Inspired by Rust and close to neverthrow, this library aims to add a few constraints for simplified handling, maintainability and debugging.

The Result type provided by the library can represent a result as a success (Ok) and a result as a failure (Bad).

This enables developers to document their api directly via typing.
And the Result API provide the ability to manipulate all results within the codebase.

By using a Result as a return, we avoid normalizing the use of throws, which make errors “normal”.
It also makes for a more intuitive reading of the execution flow and decision propagation.
