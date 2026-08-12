# Copia a documentação do repositório orbe para a pasta local orbe-1.
# Uso (PowerShell):
#   .\scripts\copiar-docs-orbe-1.ps1
#   .\scripts\copiar-docs-orbe-1.ps1 -Destino "D:\outro\caminho\orbe-1"

param(
    [string]$Destino = "$env:USERPROFILE\repos\projetos\orbe-1"
)

$RaizRepo = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (-not (Test-Path "$RaizRepo\orbe-1")) {
    $RaizRepo = Split-Path $PSScriptRoot -Parent
}
if (-not (Test-Path "$RaizRepo\orbe-1")) {
    Write-Error "Pasta orbe-1 nao encontrada no repo. Rode 'git pull' na branch master primeiro."
    exit 1
}

New-Item -ItemType Directory -Force -Path $Destino | Out-Null
Copy-Item -Path "$RaizRepo\orbe-1\*" -Destination $Destino -Recurse -Force

Write-Host "Documentacao copiada para: $Destino"
Get-ChildItem $Destino
