import horizon from '@/assets/casa-horizonte.jpg';
import patio from '@/assets/casa-patio.jpg';
import trees from '@/assets/casa-arboles.jpg';
import interior from '@/assets/interior.jpg';

export { horizon, patio, trees, interior };
export type Project = {
  slug: string; name: string; image: string; category: 'Viviendas' | 'Anteproyectos' | 'En desarrollo' | 'Refacciones';
  description: string; materials: string; gallery: string[];
};
export const projects: Project[] = [
  { slug:'casa-patio', name:'Casa Patio', image:patio, category:'Viviendas', description:'El patio como corazón de la vivienda. Una exploración de la relación entre luz, naturaleza y espacios cotidianos, donde los límites entre interior y exterior se vuelven sutiles.', materials:'Hormigón · madera · vidrio', gallery:[patio,interior] },
  { slug:'casa-entre-arboles', name:'Casa Entre Árboles', image:trees, category:'Viviendas', description:'Una arquitectura que dialoga con el paisaje. Volúmenes livianos y transparencias proponen una manera de habitar en contacto con la naturaleza.', materials:'Hormigón · acero · madera', gallery:[trees,interior] },
  { slug:'casa-horizonte', name:'Casa Horizonte', image:horizon, category:'Viviendas', description:'La horizontalidad ordena el espacio. Una propuesta de líneas puras, grandes superficies vidriadas y materialidad natural que conecta la vivienda con su entorno.', materials:'Hormigón · piedra · vidrio', gallery:[horizon,patio] },
  { slug:'interior-patio', name:'Interior Patio', image:interior, category:'Refacciones', description:'Una mirada renovada sobre el espacio interior. Luz natural, texturas y materiales nobles dan forma a una propuesta serena y funcional.', materials:'Roble · travertino · textiles naturales', gallery:[interior,patio] },
  { slug:'pabellon-natural', name:'Pabellón Natural', image:trees, category:'Anteproyectos', description:'Una exploración conceptual de la vivienda como refugio en el paisaje. La estructura, la luz y las transparencias definen la propuesta.', materials:'Madera · vidrio · hormigón', gallery:[trees,patio] },
  { slug:'residencia-abierta', name:'Residencia Abierta', image:patio, category:'En desarrollo', description:'Una propuesta conceptual que se organiza alrededor de un patio, con espacios flexibles y una continuidad fluida entre las áreas de encuentro.', materials:'Hormigón · madera · piedra', gallery:[patio,interior] },
];
export const filterProjects = (filter: string) => projects.filter(p => p.category !== 'Refacciones' && (filter === 'Todos' || p.category === filter));
export const referenceNotice = 'Selección conceptual: imágenes generadas y nombres de referencia. No representan obras realizadas por MA Arquitecta.';
export const pageMeta = (title: string, description: string) => ({ meta: [
  {title:`${title} | MA Arquitecta`}, {name:'description',content:description},
  {property:'og:title',content:`${title} | MA Arquitecta`}, {property:'og:description',content:description},
  {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'},
] });