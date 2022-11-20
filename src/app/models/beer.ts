export class Beer {
    constructor(
        public name: string,
        public id: string,
        public image_url: string,
        public abv: string,
        public ph: boolean,
        public description: string,
        public tagline?: boolean,
        public favorite?: boolean,
        public rank?: string,
    ) { }

}