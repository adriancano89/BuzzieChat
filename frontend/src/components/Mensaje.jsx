export default function Mensaje({ remitente, cuerpo }) {
    return (
        <div class="flex flex-col justify-start my-2">
            <div class="bg-gray-200 p-3 rounded-lg max-w-xs">
                <span>{remitente}</span>
                <p class="text-sm">{cuerpo}</p>
            </div>
        </div>
    )
}