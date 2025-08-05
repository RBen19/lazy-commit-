# Lazy Commit

## WHY Lazy-commit ? 


> It's not just another cool tool made for fun — it's a **real solution** to a real developer struggle.

We’ve all been there:

- “What should I even write for this commit?”
- “I’ve changed a lot of stuff... let’s just `git add .` and move on.”
- “I’m too lazy to write a proper commit message today.”

**Lazy Commit** was built for these moments — when you're tired, uninspired, or just not in the mood to deal with commit messages.

Because let’s be honest: writing good commit messages **can be annoying**.  
Agree? I thought so. 

This tool is my small contribution to your dev journey.  
I hope it saves you time, effort, and a bit of frustration.

**Thanks for giving it a try! **

## Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) must be installed on your system.
 advice: current LTS it's the best choice 

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
lazy --help
```
## some command example
```bash
lazy gc
```
```bash
lazy gp
```
## advice 
it's better to use it in a git environnement bcz this tool only help u to work more faster by generate commit message and push for u instead of think about. 

This will launch the interactive commit message