describe('EmployeeController', function() {
  var controller, scope, mockBackend;

  beforeEach(module('employapp'));

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$httpBackend_
  ) {
    scope = _$rootScope_.$new();
    mockBackend = _$httpBackend_;
    controller = _$controller_('EmployeeController', {
      $scope: scope
    });

    mockBackend.expectGET('http://localhost:3001/api/v1/dept').respond(201, [
      Object({
        name: 'i.t',
        onboardingList: [
          'One',
          'Two',
          'Three'
        ]
      })
    ]);
  }));

  it('should have default values', function() {
    expect(scope.data).toBeDefined();
    expect(scope.err).toBeUndefined();
    expect(scope.error).toBe(false);
    expect(scope.loading).toBe(false);
    expect(scope.success).toBe(false);
  });

  describe('AddEmployee', function() {
    it('should handle errors', function() {
      mockBackend.expectPOST('http://localhost:3001/api/v1/auth/signup').respond(409, {error: 'User with email already exists.'});
      mockBackend.expectGET('views/login.html').respond('');
      
      scope.addEmployee(Object({
        email: 'test@email'
      }));
      mockBackend.flush();

      expect(scope.err).toBe('User with email already exists.');
    });

    it('should handle success', function() {
      mockBackend.expectPOST('http://localhost:3001/api/v1/auth/signup').respond(201, {message: 'test user was created successfully.'});
      mockBackend.expectGET('views/login.html').respond('');
      
      scope.addEmployee(Object({
        email: 'test@email'
      }));
      mockBackend.flush();

      expect(scope.suc).toBe('test user was created successfully.');
    });


    it('should handle reseting form data', function() {
      mockBackend.expectPOST('http://localhost:3001/api/v1/auth/signup').respond(201, {message: 'test user was created successfully.'});
      mockBackend.expectGET('views/login.html').respond('');

      scope.data = Object({
        email: 'test@email'
      });
      
      scope.addEmployee(Object({
        email: 'test@email'
      }));
      mockBackend.flush();

      expect(scope.data.email).toBeUndefined();
    });
  });
});