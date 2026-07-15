# =====================================================================
#  Santer - Servidor estatico local (sem Node/Python)
#  Serve a apresentacao por HTTP para que os players do YouTube,
#  Google Maps e demais recursos funcionem corretamente.
#
#  COMO USAR:
#    1) Clique com o botao direito neste arquivo > "Executar com PowerShell"
#       (ou, no terminal do VS Code:  ./serve.ps1 )
#    2) O navegador abre automaticamente em http://localhost:8080
#    3) Para parar, feche a janela ou pressione Ctrl+C
# =====================================================================

$port = 8080
$root = $PSScriptRoot
$prefix = "http://localhost:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
} catch {
    Write-Host "Nao foi possivel iniciar o servidor na porta $port." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "Talvez a porta ja esteja em uso. Feche outros servidores e tente novamente."
    exit 1
}

Write-Host ""
Write-Host "  Servindo: $root" -ForegroundColor Cyan
Write-Host "  Endereco: ${prefix}index.html" -ForegroundColor Green
Write-Host "  Pressione Ctrl+C para encerrar." -ForegroundColor DarkGray
Write-Host ""

try { Start-Process $prefix } catch {}

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".webp" = "image/webp"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

while ($listener.IsListening) {
    try {
        $ctx = $listener.GetContext()
        $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
        if ([string]::IsNullOrEmpty($rel)) { $rel = "index.html" }

        $path = Join-Path $root $rel
        if (Test-Path $path -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($path)
            $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
            if ($mime.ContainsKey($ext)) { $ctx.Response.ContentType = $mime[$ext] }
            $ctx.Response.StatusCode = 200
            $ctx.Response.ContentLength64 = $bytes.Length
            $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $ctx.Response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - '$rel' nao encontrado")
            $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $ctx.Response.OutputStream.Close()
    } catch {
        # Ignora requisicoes abortadas pelo navegador
    }
}
