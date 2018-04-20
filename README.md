# piGarden
Irrigation system powered by raspberry pi. work in progress...

## one-line installer
Bootstrapper for making a local clone of the repo and doing the initial setup. Useful for deployment to Raspberry.

**TODO**: change url after merging

```
curl -s https://raw.githubusercontent.com/petre2dor/piGarden/40-oneLineInstaller/bootstrap.sh | sudo bash
```

## development enviroment install

- install [vagrant](https://www.vagrantup.com/) on your machine
- clone this project: `git clone https://github.com/petre2dor/piGarden/`
- enter folder and start the vagrant vm: `cd piGarden && vagrant up --provider=virtualbox`
- ssh into vm: `vagrant ssh`
- `cd /piGarden/scripts && sudo ./initialSetup.sh`
- watch the magic happen (and enjoy some music https://www.youtube.com/watch?v=qtZJiQSmJ9g)
- swich user: `sudo su gradinar`
- see actions running by watching the logs: `pm2 logs`
- connect to db: `mysql -udb_gardener -pKTgdXz3SSMCY pi_garden`
- grafana: http://localhost:3002 (admin/admin)
    - adding a source
        - Type: InfluxDB
        - URL: http://localhost:8086
        - Access: proxy
    - add dashboards...
    - add users....
    - todo save a default config and import it automatically
- graphql: http://localhost:3003/graphql



## getting updates

- sudo su gradinar
- cd /piGarden/
- git checkout master
- git pull
- sudo ./scripts/patch.sh
