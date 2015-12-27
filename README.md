# React / Reflux: Todos with JWT Authentication

## Installation

```
git clone git@github.com:scottjason/react-reflux-todos.git && cd react-reflux-todos && touch env.js
```

In the env.js file located in the root directory, set the environmental variable for mongo:

```javascript
module.exports = {
	mongo: {
		uri: 'your-mongo-uri'
	}
};
```

```
npm install
```

## Usage

To develop: ```gulp```

To build: ```gulp build```

## License

MIT