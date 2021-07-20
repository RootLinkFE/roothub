#!groovy
library 'sharelib@genlian'

properties(
    [parameters([choice(choices: ['false', 'true'], description: '是否需要构建开发分支?', name: 'autodevops')])]
)

def configMap = [
    "service": "roothub", // 服务名
    "project": "low-code", // 项目名,唯一
    "autodevops": "${autodevops}"
]
run(configMap)
