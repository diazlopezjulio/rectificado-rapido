import * as fs from 'fs';
import * as path from 'path';

export function writeFile(data: any) {
	const jsonData = JSON.stringify(data, null, 2); // Convierte el objeto a una cadena JSON
	const filePath = path.join(process.cwd(), 'src', 'assets', 'file.json');
	fs.writeFile(filePath, jsonData, 'utf8', (err: Error | null) => {
		if (err) {
			console.log('Hubo un error al escribir el archivo JSON', err);
		} else {
			console.log('Archivo JSON guardado correctamente');
		}
	});
}