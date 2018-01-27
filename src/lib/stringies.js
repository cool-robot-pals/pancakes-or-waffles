export const capitalizeFirstLetter = str =>
	typeof str === 'string'
		?	str.charAt(0).toUpperCase() + str.slice(1)
		: str

export const decapitalizeFirstLetter = str =>
	typeof str === 'string' 
		? str.charAt(0).toLowerCase() + str.slice(1)
		: str
