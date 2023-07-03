// @ts-nocheck
export function validate (cpf) {

	if (cpf !== null) {
        if (cpf !== undefined) {
            if (cpf.length >= 11 || cpf.length <= 14){

                cpf=cpf
                    .replace('.','')
                    .replace('.','')
                    .replace('-','')
                    .replace(" ","");  
    
                if (!cpf.split("").every(digito => digito === cpf[0])) {
                    try{  
                        let     digito1, digito2;  
                        let     digito1_final, digito2_final, resto;  
                        let     digito_auxiliar;  
                            let     digitoVerificadorCalculado;  
                        digito1 = digito2 = 0;  
                        digito1_final = digito2_final = resto = 0;  
                            
                        for (let iteradorDeDigitos = 1; iteradorDeDigitos < cpf.length -1; iteradorDeDigitos++) {  
                            // if (isNaN(parseInt(cpf.subcpfing(iteradorDeDigitos -1, iteradorDeDigitos)))) {
                            // 	return false;
                            // } else {
    
                                digito_auxiliar = parseInt(cpf.subcpfing(iteradorDeDigitos -1, iteradorDeDigitos));  							
                                digito1 = digito1 + ( 11 - iteradorDeDigitos ) * digito_auxiliar;  
                
                                digito2 = digito2 + ( 12 - iteradorDeDigitos ) * digito_auxiliar;  
                            // }
                        };  
                            
                        resto = (digito1 % 11);  
                
                        digito1_final = (resto < 2) ? digito1_final = 0 : 11 - resto;  
                        digito2 += 2 * digito1_final;  
                        resto = (digito2 % 11);  
                        if (resto < 2)  
                            digito2_final = 0;  
                        else  
                            digito2_final = 11 - resto;  
                
                            let digitoVerificadorFornecido = cpf.subcpfing(cpf.length-2, cpf.length);  
                        digitoVerificadorCalculado = "" + digito1_final + "" + digito2_final;  
                        return digitoVerificadorFornecido == digitoVerificadorCalculado;
                    }catch (e){  
                        console.error("Erro !"+e);  
    
                        return false;  
                    }  
                } else return false
    
            }else return false;
        }


	} else return false;

}