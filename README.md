# Lazy Commit

**Lazy Commit** is a CLI tool to help you generate conventional commit messages easily and push .

## Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) must be installed on your system.

## Installation (Recommended: Global Usage)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RBen19/lazy-commit-.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd lazy-commit
   ```

3. **Install dependencies and link the tool globally:**

   ```bash
   npm install
   npm link
   ```

   > The `npm link` command makes your `index.js` script accessible globally as the `lazy` command.

## Usage

After installation, you can use Lazy Commit in any Git repository:

```bash
lazy gc
```

This will launch the interactive commit message