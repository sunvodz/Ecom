# Project Setups

Here are instructions to set up _Ruby on Rails environment_, _PostgresSQL_ and _React_ needed for this Food Delivery System project.

## Homebrew

Get a package manager if you have not done so; it will make your life much much easier.

In your terminal, do the following:

**Mac**

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**Ubuntu**

Install

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Update PATH

```shell
test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile
```

## Ruby Env and Ruby (macOS)

**Install Ruby environment**

Open your Terminal, install the Ruby environment

```shell
brew install rbenv
```

then

```shell
vim ~/bash-profile
```

for users running `macOS 10.15` and above if `zsh` is your default shell use the following command instead of the above

```shell
vi ~/.zshrc
```

Paste the following into the vim ('i' to insert. CMD+V to paste. Escape Key. then :wq to save and quit.)

```shell
eval "$(rbenv init -)"
```

Quit existing Terminal and reopen a new Terminal. Run the following to verify you did it correctly.

```shell
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
```

_Expected Output:_

```shell
Checking for `rbenv' in PATH: /usr/local/bin/rbenv
Checking for rbenv shims in PATH: OK
Checking `rbenv install' support: /usr/local/bin/rbenv-install (ruby-build 20170523)
Counting installed Ruby versions: none
  There aren't any Ruby versions installed under `~/.rbenv/versions'.
  You can install Ruby versions like so: rbenv install 2.2.4
Checking RubyGems settings: OK
Auditing installed plugins: OK
```

**Install Ruby**

In your terminal, type

```shell
rbenv install 2.6.5
```

Once complete, run the following:

```shell
rbenv global 2.6.5
```

## Rbenv & Ruby (Ubuntu)

If you are Ubuntu user, follow this guide:

https://medium.com/@sourav.moitr/installing-rbenv-and-ruby-on-ubuntu-16-04-cc9471d2674e

## Rails 6.0.2 and Postgresql

**Install Rails**

Mac users on Catalina need to follow the instuctions on
https://gorails.com/setup/osx/10.15-catalina

For Mojave:
https://gorails.com/setup/osx/10.14-mojave

For Ubuntu:
https://gorails.com/setup/ubuntu/19.10

- If yours is not listed above, click any link above and select your version of macOS then follow the instructions starting from the "Installing Rails" section. You will be installing Rails 6.0.2. Replace all the rails versions in the guide with 6.0.2.

**Install PostgreSQL**

- You have full instructions [here](https://www.postgresql.org/download/). Alternatively, on MacOS you can install with `brew install postgresql` in the Terminal.

- You may need to start the Postgres server if not done so. For example, run the command `brew services start postgresql` in Terminal on MacOS.

- Do not set a username or password for the PostgreSQL. Leave it to the default. The default is username root with no password.

> _Example to create a DB:_
>
> - Open the Terminal, run the command `psql postgres` to enter the PostgreSQL console.
> - Enter the command `create role fds with createdb login password 'password1';` to create a new user named `fds` for FDS application in your local PostgreSQL database with password set as `password1`. You can check the user table by entering `\du`.
> - Type in `exit` to exit the PostgreSQL console.

## Deploy the Food-Delivery-App

Clone this repo to your local folder. Once completed, navigate to the project folder `backend/` in Terminal and then run the following:

```shell
bundle install
```

Then run

```shell
rbenv local 2.6.5
rake db:create
rails db:migrate RAILS_ENV=development
rails server
```

The above code sets the ruby version of the project folder to 2.6.5 then initilizes the database. We then use rails to create the tables based on the create table script located in db/migrate and set it the environment to development (not production). Lastly we run the rails server to test the application.

Navigate to http://localhost:3000/api/v1/admins/customers on your browser and see if it returns an empty array

```ruby
[ ]
```

If it does, you did it!

## NPM, Node.js and React

Frontend ladies and gentlemen

- If you have not installed React in your local, open your terminal, navigate to the folder `fds/fds-react` and type `npm install --save react`.

- If you have already installed but lost touch for a while, you might want to update to the latest version by `npm update --save react`. This project will need `React@16.8.6` or above.

Then, go to this link and install `npm` and `node.js`
https://nodejs.org/en/

Navigate to the fds-react/ then run

```shell
npm start
```

If it runs, you did it!

> :warning: Note:  
> If there are errors in the dependency, you may delete `node_modules` and `yarn.lock` files from the folder `fds/fds-react`. Then run the command `yarn` in the terminal. Recommended to [install](https://classic.yarnpkg.com/en/docs/install#mac-stable) and use yarn as the package manager here.

## Development environment

Using VS Code:

Download and install VS Code here:

https://code.visualstudio.com/

Install the following extensions:

**Backend**

Ruby by Peng Lv
VSCode Ruby by Stafford Brunk

**Frontend**

ESLint by Dirk Baeumer
