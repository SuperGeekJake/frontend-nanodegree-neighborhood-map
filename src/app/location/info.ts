export class LocationInfo extends google.maps.InfoWindow {
  constructor(options: any) {
    let content = '<div class="content">';
    content += `<h4>${options.title}</h4>`;
    content += '<p>'
    if (options.category) content += `${options.category}<br>`;
    if (options.phone) content += `${options.phone}<br>`;
    if (options.address) content += `${options.address}<br>`;
    content += '</p>';
    content += `<div>${options.source}</div>`;
    content += '</div>';

    super({
      content: content
    });
  }
}
