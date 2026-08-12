# Copia a documentação do repositório orbe para a pasta local:
#   C:\Users\igor.ssantos\repos\projetos\orbe-1
#
# Uso (PowerShell, dentro do clone do orbe):
#   .\scripts\copiar-docs-orbe-1.ps1

param(
    [string]$Destino = "C:\Users\igor.ssantos\repos\projetos\orbe-1"
)

$RaizRepo = Split-Path $PSScriptRoot -Parent
if (-not (Test-Path "$RaizRepo\orbe-1")) {
    Write-Error "Pasta orbe-1 nao encontrada em $RaizRepo. Rode 'git pull origin master' primeiro."
    exit 1
}

New-Item -ItemType Directory -Force -Path $Destino | Out-Null
Copy-Item -Path "$RaizRepo\orbe-1\*" -Destination $Destino -Recurse -Force

Write-Host "Documentacao copiada para: $Destino"
Get-ChildItem $Destino
