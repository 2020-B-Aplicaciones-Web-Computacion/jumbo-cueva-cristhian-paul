import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {paisController} from "./pais.controller";
import {PaisEntity} from "./pais.entity";
import {PaisService} from "./pais.service";


@Module({
    controllers: [
        paisController
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    PaisEntity
                ],
                'default' // Nombre cadena de conexión
            ),


    ],
    providers: [
        PaisService
    ]
})
export class PaisModule {

}
