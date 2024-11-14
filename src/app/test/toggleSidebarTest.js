import { JSDOM } from 'jsdom';

describe('toggleSidebar', () => {
  let document;
  
  beforeEach(() => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="sidebar"></div>
          <div id="mainContent"></div>
        </body>
      </html>
    `);
    document = dom.window.document;
    global.document = document;
  });

  afterEach(() => {
    global.document = undefined;
  });

  test('should toggle active class on sidebar and mainContent', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    toggleSidebar();
    
    expect(sidebar.classList.contains('active')).toBe(true);
    expect(mainContent.classList.contains('active')).toBe(true);
    
    toggleSidebar();
    
    expect(sidebar.classList.contains('active')).toBe(false);
    expect(mainContent.classList.contains('active')).toBe(false);
  });

  test('should handle missing elements gracefully', () => {
    document.getElementById('sidebar').remove();
    document.getElementById('mainContent').remove();
    
    expect(() => {
      toggleSidebar();
    }).not.toThrow();
  });

  test('should toggle active class when elements already have other classes', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    sidebar.classList.add('existing-class');
    mainContent.classList.add('other-class');
    
    toggleSidebar();
    
    expect(sidebar.classList.contains('existing-class')).toBe(true);
    expect(sidebar.classList.contains('active')).toBe(true);
    expect(mainContent.classList.contains('other-class')).toBe(true);
    expect(mainContent.classList.contains('active')).toBe(true);
  });
});
console.log("test");