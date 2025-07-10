import type Postagem from "./Postagens";

export default interface Tema{
    id: number | undefined;
    descricao: string;
    postagem?: Postagem[] | null;
}