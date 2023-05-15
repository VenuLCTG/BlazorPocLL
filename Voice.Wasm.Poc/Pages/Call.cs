using Microsoft.JSInterop;
namespace Voice.Wasm.Poc.Pages;

public class JsInteropClasses : IDisposable
{
    private readonly IJSRuntime js;

    public JsInteropClasses(IJSRuntime js)
    {
        this.js = js;
    }

    public async ValueTask TickerChanged(string serverName, string userName, string password)
    {
        await js.InvokeVoidAsync("displayTickerAlert1", serverName, userName, password);
    }

    public void Dispose()
    {
    }
}
