# Ansible managed: /ansible/roles/unicorn/templates/unicorn.rb.j2 modified on 2016-06-17 19:47:24 by vagrant on localhost

working_directory '/MOT'

pid '/tmp/MOT/unicorn.development.pid'

stderr_path '/MOT/log/unicorn.err.log'
stdout_path '/MOT/log/unicorn.log'

listen '/tmp/unicorn.development.sock'

worker_processes 2

timeout 30
