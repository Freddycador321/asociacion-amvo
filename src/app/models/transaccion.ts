export interface Transaccion {

		id: number,
		fecha: Date,
		total: number,
		nombre: string,
		nit: string,
		username: string,
		historial: [
			{
				cantidad: number,
				precio: number,
				nombre: string
			}
		]
}
