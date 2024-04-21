all: node_modules migrate start
.PHONY: all migrate seed start clean

node_modules: package.json
	npm install

migrate: node_modules
	npx sequelize-cli db:migrate --config src/config/database.js


seed: node_modules
	npx sequelize-cli db:seed:all

start: 
	npm run dev 

clean:
	rm -rf node_modules db.sqlite